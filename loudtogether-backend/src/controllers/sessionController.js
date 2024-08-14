const mongoose = require("mongoose");
const Session = require("../models/Session");
const ytdl = require("@distube/ytdl-core");

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const ffmpeg = require("fluent-ffmpeg");

const {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const customConfig = {
  dictionaries: [adjectives, colors, animals],
  separator: "",
  length: 2,
  style: "capital",
};

exports.createSession = async (req, res) => {
  try {
    const { youtubeUrl, adminName } = req.body;

    // Generate a friendly admin name if not provided
    const friendlyAdminName = adminName || uniqueNamesGenerator(customConfig);

    const session = new Session({ youtubeUrl, adminName: friendlyAdminName });
    await session.save();

    // Cache session data in Redis
    await req.redisClient.set(
      `session:${session._id}`,
      JSON.stringify(session)
    );

    res.status(201).json({
      sessionId: session._id,
      adminName: friendlyAdminName,
    });
  } catch (error) {
    console.error("Error in createSession:", error);
    res
      .status(500)
      .json({ message: "Error creating session", error: error.message });
  }
};

exports.getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Check if sessionId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    // Try to get session from Redis cache
    const cachedSession = await req.redisClient.get(`session:${sessionId}`);
    if (cachedSession) {
      return res.json(JSON.parse(cachedSession));
    }

    // If not in cache, get from MongoDB
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Cache the session data
    await req.redisClient.set(`session:${sessionId}`, JSON.stringify(session));

    res.json(session);
  } catch (error) {
    console.error("Error in getSession:", error);
    res
      .status(500)
      .json({ message: "Error fetching session", error: error.message });
  }
};

exports.removeParticipant = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { participantName } = req.body;

    // Check if sessionId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    // Update MongoDB
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { $pull: { participants: participantName } },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update or invalidate Redis cache
    const redisKey = `session:${sessionId}`;
    if (session.participants.length > 0) {
      // Update the cache with the new session data
      await req.redisClient.set(redisKey, JSON.stringify(session));
    } else {
      // If the session is now empty, remove it from the cache
      await req.redisClient.del(redisKey);
    }

    // Notify all participants of the user departure
    req.pusher.trigger(`session-${sessionId}`, "participant-left", {
      participantName,
    });

    // Check if the session is now empty
    if (session.participants.length === 0) {
      // Delete the session from MongoDB
      await Session.findByIdAndDelete(sessionId);
      // Ensure it's removed from Redis (redundant but safe)
      await req.redisClient.del(redisKey);
      return res.json({
        message: "Participant removed and empty session deleted",
      });
    }

    // Check if the removed participant was the admin
    if (
      participantName === session.adminName &&
      session.participants.length > 0
    ) {
      // Assign a new admin (e.g., the first remaining participant)
      const newAdmin = session.participants[0];
      session.adminName = newAdmin;
      await session.save();

      // Update Redis cache with the new session data
      await req.redisClient.set(redisKey, JSON.stringify(session));

      // Notify participants of the admin change
      req.pusher.trigger(`session-${sessionId}`, "admin-changed", {
        newAdminName: newAdmin,
      });
    }

    res.json({
      message: "Participant removed successfully",
      updatedSession: session,
    });
  } catch (error) {
    console.error("Error in removeParticipant:", error);
    res
      .status(500)
      .json({ message: "Error removing participant", error: error.message });
  }
};

exports.joinSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { participantName } = req.body;

    const session = await Session.findByIdAndUpdate(
      sessionId,
      { $addToSet: { participants: participantName } },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update Redis cache
    await req.redisClient.set(`session:${sessionId}`, JSON.stringify(session));

    // Notify other participants via Pusher
    req.pusher.trigger(`session-${sessionId}`, "participant-joined", {
      participantName,
    });

    res.json({ message: "Joined session successfully", session });
  } catch (error) {
    console.error("Error in joinSession:", error);
    res
      .status(500)
      .json({ message: "Error joining session", error: error.message });
  }
};

exports.leaveSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { participantName } = req.body;

    // Remove the participant from the session in your database
    // This is a placeholder - implement according to your database structure
    await Session.removeParticipant(sessionId, participantName);

    // Notify all participants of the user departure
    req.pusher.trigger(`session-${sessionId}`, "participant-left", {
      participantName,
    });

    res.json({ message: "Left session successfully" });
  } catch (error) {
    console.error("Error in leaveSession:", error);
    res
      .status(500)
      .json({ message: "Error leaving session", error: error.message });
  }
};

exports.syncAudio = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { currentTime, isPlaying } = req.body;

    // Notify all participants of the audio sync event
    req.pusher.trigger(`session-${sessionId}`, "audio-sync", {
      currentTime,
      isPlaying,
    });

    res.json({ message: "Audio synced successfully" });
  } catch (error) {
    console.error("Error in syncAudio:", error);
    res
      .status(500)
      .json({ message: "Error syncing audio", error: error.message });
  }
};

exports.getAudioInfo = async (req, res) => {
  try {
    const { youtubeUrl } = req.query;

    if (!youtubeUrl) {
      return res.status(400).json({ message: "YouTube URL is required" });
    }

    console.log("Fetching audio info for:", youtubeUrl);

    const info = await ytdl.getInfo(youtubeUrl);
    const videoId = info.videoDetails.videoId;
    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");

    let cloudinaryUrl;

    // Check if audio already exists in Cloudinary
    try {
      const existingAsset = await cloudinary.api.resource(
        `loudtogether/${videoId}`,
        {
          resource_type: "video",
        }
      );
      console.log("Audio already exists in Cloudinary");
      cloudinaryUrl = existingAsset.secure_url;
    } catch (cloudinaryError) {
      if (cloudinaryError.error && cloudinaryError.error.http_code === 404) {
        console.log("Audio not found in Cloudinary, proceeding to upload");

        // Get the best audio format
        const bestAudio = audioFormats[0];

        // Download the audio
        const audioStream = ytdl(youtubeUrl, { format: bestAudio });

        // Convert to mp3 using ffmpeg
        const mp3Stream = ffmpeg(audioStream)
          .audioCodec("libmp3lame")
          .format("mp3")
          .pipe();

        // Upload to Cloudinary
        try {
          const uploadResult = await new Promise((resolve, reject) => {
            const cloudStream = cloudinary.uploader.upload_stream(
              {
                resource_type: "video",
                folder: "loudtogether",
                public_id: videoId,
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );

            mp3Stream.pipe(cloudStream);
          });

          console.log("Audio uploaded to Cloudinary:", uploadResult.secure_url);
          cloudinaryUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          throw uploadError;
        }
      } else {
        console.error("Unexpected Cloudinary API error:", cloudinaryError);
        throw cloudinaryError;
      }
    }

    res.json({
      title: info.videoDetails.title,
      audioFormats: audioFormats.map((format) => ({
        itag: format.itag,
        mimeType: format.mimeType,
        bitrate: format.bitrate,
      })),
      cloudinaryUrl: cloudinaryUrl,
    });
  } catch (error) {
    console.error("Error in getAudioInfo:", error);
    res
      .status(500)
      .json({ message: "Error fetching audio info", error: error.message });
  }
};

exports.removeParticipant = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { participantName } = req.body;

    // Check if sessionId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    // Update MongoDB
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { $pull: { participants: participantName } },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update or invalidate Redis cache
    const redisKey = `session:${sessionId}`;
    if (session.participants.length > 0) {
      // Update the cache with the new session data
      await req.redisClient.set(redisKey, JSON.stringify(session));
    } else {
      // If the session is now empty, remove it from the cache
      await req.redisClient.del(redisKey);
    }

    // Notify all participants of the user departure
    req.pusher.trigger(`session-${sessionId}`, "participant-left", {
      participantName,
    });

    // Check if the session is now empty
    if (session.participants.length === 0) {
      // Delete the session from MongoDB
      await Session.findByIdAndDelete(sessionId);
      // Ensure it's removed from Redis (redundant but safe)
      await req.redisClient.del(redisKey);
      return res.json({
        message: "Participant removed and empty session deleted",
      });
    }

    // Check if the removed participant was the admin
    if (
      participantName === session.adminName &&
      session.participants.length > 0
    ) {
      // Assign a new admin (e.g., the first remaining participant)
      const newAdmin = session.participants[0];
      session.adminName = newAdmin;
      await session.save();

      // Update Redis cache with the new session data
      await req.redisClient.set(redisKey, JSON.stringify(session));

      // Notify participants of the admin change
      req.pusher.trigger(`session-${sessionId}`, "admin-changed", {
        newAdminName: newAdmin,
      });
    }

    res.json({
      message: "Participant removed successfully",
      updatedSession: session,
    });
  } catch (error) {
    console.error("Error in removeParticipant:", error);
    res
      .status(500)
      .json({ message: "Error removing participant", error: error.message });
  }
};

exports.leaveSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { participantName } = req.body;

    // Update the session in MongoDB
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { $pull: { participants: participantName } },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update Redis cache
    const redisKey = `session:${sessionId}`;
    if (session.participants.length > 0) {
      await req.redisClient.set(redisKey, JSON.stringify(session));
    } else {
      await req.redisClient.del(redisKey);
    }

    // Notify all participants of the user departure
    req.pusher.trigger(`session-${sessionId}`, "participant-left", {
      participantName,
    });

    // Check if the session is now empty
    if (session.participants.length === 0) {
      // Delete the session from MongoDB
      await Session.findByIdAndDelete(sessionId);
      // Ensure it's removed from Redis (redundant but safe)
      await req.redisClient.del(redisKey);
      return res.json({
        message: "Participant removed and empty session deleted",
      });
    }

    // Check if the removed participant was the admin
    if (
      participantName === session.adminName &&
      session.participants.length > 0
    ) {
      // Assign a new admin (e.g., the first remaining participant)
      const newAdmin = session.participants[0];
      session.adminName = newAdmin;
      await session.save();

      // Update Redis cache with the new session data
      await req.redisClient.set(redisKey, JSON.stringify(session));

      // Notify participants of the admin change
      req.pusher.trigger(`session-${sessionId}`, "admin-changed", {
        newAdminName: newAdmin,
      });
    }

    res.json({
      message: "Left session successfully",
      updatedSession: session,
    });
  } catch (error) {
    console.error("Error in leaveSession:", error);
    res
      .status(500)
      .json({ message: "Error leaving session", error: error.message });
  }
};
