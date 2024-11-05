import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AudioControls from "./AudioControls";
import SessionInfo from "./SessionInfo";
import axios from "axios";
import { toast } from "react-toastify";

const ParticipantView = React.memo(
  ({
    session,
    audioInfo,
    audioPlayerRef,
    isPlaying,
    currentTime,
    onTimeUpdate,
    onPlayPause,
    participantName,
  }) => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();

    const handleLeaveSession = useCallback(async () => {
      try {
        await axios.post(`${SERVER_URL}/api/sessions/${session._id}/leave`, {
          participantName,
        });
        console.log("Successfully left the session.");
        toast.success("Successfully left the session!");

        navigate("/");
      } catch (error) {
        console.error("Error leaving session:", error);
      }
    }, [SERVER_URL, session._id, participantName, navigate]);

    const handleBeforeUnload = useCallback(
      (event) => {
        event.preventDefault();
        event.returnValue = "";

        const leaveSessionData = { participantName };
        navigator.sendBeacon(
          `${SERVER_URL}/api/sessions/${session._id}/leave`,
          JSON.stringify(leaveSessionData)
        );
      },
      [SERVER_URL, session._id, participantName]
    );

    useEffect(() => {
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [handleBeforeUnload]);

    return (
      <>
        <SessionInfo session={session} audioInfo={audioInfo} />
        <AudioControls
          audioPlayerRef={audioPlayerRef}
          audioUrl={audioInfo.cloudinaryUrl}
          isAdmin={false}
          onTimeUpdate={onTimeUpdate}
          onPlayPause={onPlayPause}
          isPlaying={isPlaying}
          currentTime={currentTime}
        />
        <div className="bg-gray-100 rounded-xl p-4 mt-4">
          <p className="text-center text-sm text-gray-600">
            The admin controls the playback. You can listen along but not
            control the audio.
          </p>
        </div>
        <button
          onClick={handleLeaveSession}
          className="mt-4 bg-red-500 text-white p-2 rounded w-full"
        >
          Leave Session
        </button>
      </>
    );
  }
);

ParticipantView.displayName = "ParticipantView";

ParticipantView.propTypes = {
  session: PropTypes.object.isRequired,
  audioInfo: PropTypes.object.isRequired,
  audioPlayerRef: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  participantName: PropTypes.string.isRequired,
};

export default ParticipantView;
