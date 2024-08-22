// Session.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
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
import SplashScreen from "../components/SplashScreen";

const AdminView = ({
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

const ParticipantView = ({
  session,
  audioInfo,
  audioPlayerRef,
  isPlaying,
  currentTime,
  onTimeUpdate,
}) => (
  <>
    <SessionInfo session={session} audioInfo={audioInfo} />
    <div className="bg-[#17D9A3] text-white rounded-2xl p-4 mb-6">
      <p className="text-center font-semibold">Participant View</p>
    </div>
    <AudioControls
      audioPlayerRef={audioPlayerRef}
      audioUrl={audioInfo.cloudinaryUrl}
      isAdmin={false}
      onTimeUpdate={onTimeUpdate}
      onPlayPause={() => {}}
      isPlaying={isPlaying}
      currentTime={currentTime}
    />
    <div className="bg-gray-100 rounded-xl p-4 mt-4">
      <p className="text-center text-sm text-gray-600">
        The admin controls the playback. You can listen along but not control
        the audio.
      </p>
    </div>
  </>
);

ParticipantView.propTypes = {
  session: PropTypes.object.isRequired,
  audioInfo: PropTypes.object.isRequired,
  audioPlayerRef: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
};

function Session() {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [audioInfo, setAudioInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioPlayerRef = useRef(null);
  const lastSyncTime = useRef(0);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const VITE_KEY = import.meta.env.VITE_PUSHER_KEY;
  const VITE_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER;

  const syncAudioState = useCallback((time, playing) => {
    if (audioPlayerRef.current) {
      const currentTime = audioPlayerRef.current.currentTime;
      const timeDiff = Math.abs(currentTime - time);

      if (timeDiff > 1) {
        // Only sync if difference is more than 1 second
        audioPlayerRef.current.currentTime = time;
      }

      setCurrentTime(time);
      setIsPlaying(playing);

      if (playing && audioPlayerRef.current.paused) {
        audioPlayerRef.current.play();
      } else if (!playing && !audioPlayerRef.current.paused) {
        audioPlayerRef.current.pause();
      }
    }
  }, []);

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
  }, [sessionId, location.state, SERVER_URL]);

  useEffect(() => {
    const pusher = new Pusher(VITE_KEY, { cluster: VITE_CLUSTER });
    const channel = pusher.subscribe(`session-${sessionId}`);

    channel.bind("audio-sync", (data) => {
      const now = Date.now();
      if (now - lastSyncTime.current > 1000) {
        // Throttle sync events
        syncAudioState(data.currentTime, data.isPlaying);
        lastSyncTime.current = now;
      }
    });

    channel.bind("participant-joined", (data) => {
      setSession((prevSession) => ({
        ...prevSession,
        participants: [...prevSession.participants, data.participantName],
      }));
    });

    // Periodic sync check
    const syncInterval = setInterval(() => {
      if (!isAdmin) {
        axios
          .get(`${SERVER_URL}/api/sessions/${sessionId}/sync`)
          .then((response) => {
            syncAudioState(response.data.currentTime, response.data.isPlaying);
          })
          .catch((error) => console.error("Error fetching sync data:", error));
      }
    }, 5000); // Check every 5 seconds

    return () => {
      pusher.unsubscribe(`session-${sessionId}`);
      clearInterval(syncInterval);
    };
  }, [sessionId, VITE_KEY, VITE_CLUSTER, syncAudioState, isAdmin, SERVER_URL]);

  useEffect(() => {
    const joinSession = async () => {
      if (location.state && location.state.participantName) {
        try {
          await axios.post(`${SERVER_URL}/api/sessions/${sessionId}/join`, {
            participantName: location.state.participantName,
          });
          const syncResponse = await axios.get(
            `${SERVER_URL}/api/sessions/${sessionId}/sync`
          );
          syncAudioState(
            syncResponse.data.currentTime,
            syncResponse.data.isPlaying
          );
        } catch (error) {
          console.error("Error joining session:", error);
        }
      }
    };

    joinSession();
  }, [sessionId, location.state, SERVER_URL, syncAudioState]);

  const handleTimeUpdate = useCallback(
    (time) => {
      setCurrentTime(time);
      if (isAdmin) {
        const now = Date.now();
        if (now - lastSyncTime.current > 1000) {
          // Throttle sync requests
          axios.post(`${SERVER_URL}/api/sessions/${sessionId}/sync`, {
            currentTime: time,
            isPlaying,
          });
          lastSyncTime.current = now;
        }
      }
    },
    [isAdmin, isPlaying, sessionId, SERVER_URL]
  );

  const handlePlayPause = useCallback(
    (playing) => {
      setIsPlaying(playing);
      if (isAdmin) {
        axios.post(`${SERVER_URL}/api/sessions/${sessionId}/sync`, {
          currentTime: audioPlayerRef.current?.currentTime || 0,
          isPlaying: playing,
        });
      }
    },
    [isAdmin, sessionId, SERVER_URL]
  );

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
            currentTime={currentTime}
          />
        ) : (
          <ParticipantView
            session={session}
            audioInfo={audioInfo}
            audioPlayerRef={audioPlayerRef}
            isPlaying={isPlaying}
            currentTime={currentTime}
            onTimeUpdate={handleTimeUpdate}
          />
        )}
      </div>

      <ParticipantsModal participants={session.participants} />
      <HomeIndicator />
    </div>
  );
}

export default Session;
