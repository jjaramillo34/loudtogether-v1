// Session.jsx
import { useEffect, useState, useRef } from "react";
import Proptypes from "prop-types";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { ArrowLeft } from "lucide-react";
import StatusBar from "../components/StatusBar";
import Background from "../components/Background";
import HomeIndicator from "../components/HomeIndicator";
import SessionInfo from "../components/SessionInfo";
import AudioControls from "../components/AudioControls";
import ParticipantsModal from "../components/ParticipantsModal";

const SplashScreen = () => (
  <div className="max-w-md mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#17D9A3] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <div className="text-2xl font-semibold text-[#17D9A3]">Loading...</div>
      </div>
    </div>
  </div>
);

const AdminView = ({
  session,
  audioInfo,
  audioPlayerRef,
  handleTimeUpdate,
  handlePlayPause,
  isPlaying,
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
    />
  </>
);

AdminView.propTypes = {
  session: Proptypes.object.isRequired,
  audioInfo: Proptypes.object.isRequired,
  audioPlayerRef: Proptypes.object.isRequired,
  handleTimeUpdate: Proptypes.func.isRequired,
  handlePlayPause: Proptypes.func.isRequired,
  isPlaying: Proptypes.bool.isRequired,
};

const ParticipantView = ({ session, audioInfo, isPlaying }) => (
  <>
    <SessionInfo session={session} audioInfo={audioInfo} />
    <div className="bg-[#17D9A3] text-white rounded-2xl p-4 mb-6">
      <p className="text-center font-semibold">Participant View</p>
    </div>
    <div className="bg-gray-100 rounded-xl p-4 mb-6">
      <p className="text-center text-lg font-semibold mb-2">
        {isPlaying ? "Music is playing" : "Music is paused"}
      </p>
      <p className="text-center text-sm text-gray-600">
        The admin controls the playback. Enjoy the music!
      </p>
    </div>
  </>
);

ParticipantView.propTypes = {
  session: Proptypes.object.isRequired,
  audioInfo: Proptypes.object.isRequired,
  isPlaying: Proptypes.bool.isRequired,
};
export { AdminView, ParticipantView };

function Session() {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [audioInfo, setAudioInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const VITE_KEY = import.meta.env.VITE_PUSHER_KEY;
  const VITE_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER;

  console.log("Environment Variables:");
  console.log("SERVER_URL:", SERVER_URL);
  console.log("PUSHER_KEY:", VITE_KEY);
  console.log("PUSHER_CLUSTER:", VITE_CLUSTER);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const sessionResponse = await axios.get(
          `${SERVER_URL}/api/sessions/${sessionId}`
        );
        setSession(sessionResponse.data);
        setIsAdmin(
          sessionResponse.data.adminName === location.state?.participantName
        );

        const audioInfoResponse = await axios.get(
          `${SERVER_URL}/api/sessions/audio-info?youtubeUrl=${sessionResponse.data.youtubeUrl}`
        );
        setAudioInfo(audioInfoResponse.data);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, [sessionId, location.state]);

  useEffect(() => {
    const pusher = new Pusher(VITE_KEY, {
      cluster: VITE_CLUSTER,
    });

    const channel = pusher.subscribe(`session-${sessionId}`);

    channel.bind("audio-sync", (data) => {
      if (!isAdmin && audioPlayerRef.current) {
        audioPlayerRef.current.setCurrentTime(data.currentTime);
        setIsPlaying(data.isPlaying);
        if (data.isPlaying) {
          audioPlayerRef.current.play();
        } else {
          audioPlayerRef.current.pause();
        }
      }
    });

    channel.bind("participant-joined", (data) => {
      setSession((prevSession) => ({
        ...prevSession,
        participants: [...prevSession.participants, data.participantName],
      }));
    });

    return () => {
      pusher.unsubscribe(`session-${sessionId}`);
    };
  }, [sessionId, isAdmin]);

  useEffect(() => {
    const joinSession = async () => {
      if (location.state && location.state.participantName) {
        try {
          await axios.post(`${SERVER_URL}/api/sessions/${sessionId}/join`, {
            participantName: location.state.participantName,
          });
        } catch (error) {
          console.error("Error joining session:", error);
        }
      }
    };

    joinSession();
  }, [sessionId, location.state]);

  const handleTimeUpdate = (currentTime) => {
    if (isAdmin) {
      axios.post(`${SERVER_URL}/api/sessions/${sessionId}/sync`, {
        currentTime,
      });
    }
  };

  const handlePlayPause = (playing) => {
    setIsPlaying(playing);
    if (isAdmin) {
      axios.post(`${SERVER_URL}/api/sessions/${sessionId}/sync`, {
        isPlaying: playing,
      });
    }
  };

  if (!session || !audioInfo) {
    return <SplashScreen />;
  }

  return (
    <div className="max-w-md mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
      <StatusBar />
      <Background />

      <div className="flex-grow flex flex-col px-8 pt-6 relative z-10 overflow-y-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft size={24} color="#17D9A3" />
          </button>
          <h1 className="text-2xl font-bold">Session: {sessionId}</h1>
        </div>

        {isAdmin ? (
          <AdminView
            session={session}
            audioInfo={audioInfo}
            audioPlayerRef={audioPlayerRef}
            handleTimeUpdate={handleTimeUpdate}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
          />
        ) : (
          <ParticipantView
            session={session}
            audioInfo={audioInfo}
            isPlaying={isPlaying}
          />
        )}
      </div>

      <ParticipantsModal participants={session.participants} />

      {/* Home Indicator */}
      <HomeIndicator />
    </div>
  );
}

export default Session;
