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
  }) => (
    <>
      <SessionInfo session={session} audioInfo={audioInfo} />
      <div className="bg-[#17D9A3] text-white rounded-2xl p-4 mb-6">
        <p className="text-center font-semibold">Admin View</p>
      </div>
      <AudioControls
        audioPlayerRef={audioPlayerRef}
        audioUrl={audioInfo.cloudinaryUrl}
        isAdmin={true}
        onTimeUpdate={handleTimeUpdate}
        onPlayPause={handlePlayPause}
        isPlaying={isPlaying}
        currentTime={currentTime}
      />
    </>
  )
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
