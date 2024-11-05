import React, { useCallback } from "react";
import PropTypes from "prop-types";
import AudioControls from "./AudioControls";
import SessionInfo from "./SessionInfo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminView = React.memo(
  ({
    session,
    audioInfo,
    handleTimeUpdate,
    handlePlayPause,
    isPlaying,
    currentTime,
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

    return (
      <>
        <SessionInfo
          session={session}
          audioInfo={audioInfo}
          key={session.participants.length}
        />
        <AudioControls
          audioUrl={audioInfo.cloudinaryUrl}
          isAdmin={true}
          onTimeUpdate={handleTimeUpdate}
          onPlayPause={handlePlayPause}
          isPlaying={isPlaying}
          currentTime={currentTime}
        />
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

AdminView.propTypes = {
  session: PropTypes.object.isRequired,
  audioInfo: PropTypes.object.isRequired,
  handleTimeUpdate: PropTypes.func.isRequired,
  handlePlayPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  refetchSessionData: PropTypes.func.isRequired,
  participantName: PropTypes.string.isRequired,
};

AdminView.displayName = "AdminView";

export default AdminView;
