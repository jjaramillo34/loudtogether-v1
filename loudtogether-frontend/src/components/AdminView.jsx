import React from "react";
import PropTypes from "prop-types";
import AudioControls from "./AudioControls";
import SessionInfo from "./SessionInfo";

const AdminView = React.memo(
  ({
    session,
    audioInfo,
    audioPlayerRef,
    handleTimeUpdate,
    handlePlayPause,
    isPlaying,
    currentTime,
  }) => {
    const shareLink = `${window.location.origin}/session/${session.name}`;

    return (
      <div>
        <SessionInfo session={session} audioInfo={audioInfo} />
        <div className="bg-[#17D9A3] text-white rounded-2xl p-4 mb-6">
          <p className="text-center font-semibold">Admin View</p>
        </div>
        <div className="flex flex-col items-center">
          {audioInfo?.thumbnail && (
            <img
              src={audioInfo.thumbnail}
              alt="Video Thumbnail"
              className="mb-4 rounded-lg"
            />
          )}
          <p className="font-semibold">{audioInfo?.songName}</p>
          <a
            href={audioInfo?.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mb-4"
          >
            Watch on YouTube
          </a>
          <AudioControls
            audioPlayerRef={audioPlayerRef}
            audioUrl={audioInfo?.cloudinaryUrl}
            isAdmin={true}
            onTimeUpdate={handleTimeUpdate}
            onPlayPause={handlePlayPause}
            isPlaying={isPlaying}
            currentTime={currentTime}
            showVolumeControls={false}
          />
          <p className="mt-4">Share this session: {shareLink}</p>
        </div>
      </div>
    );
  }
);

AdminView.propTypes = {
  session: PropTypes.object.isRequired,
  audioInfo: PropTypes.object.isRequired,
  audioPlayerRef: PropTypes.object.isRequired,
  handleTimeUpdate: PropTypes.func.isRequired,
  handlePlayPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
};

AdminView.displayName = "AdminView";

export default AdminView;
