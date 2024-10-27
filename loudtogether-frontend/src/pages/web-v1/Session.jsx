import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { Home, Users } from "lucide-react";
import HomeIndicator from "../../components/HomeIndicator";
import ParticipantsModal from "../../components/ParticipantsModal";
import SplashScreen from "../../components/SplashScreen";
import AdminView from "../../components/AdminView";
import ParticipantView from "../../components/ParticipantView";
import PreSessionScreen from "../../components/PreSessionScreen";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../../components/ui/breadcrumb";

const Session = React.memo(() => {
  const { sessionId } = useParams();
  const location = useLocation();
  //const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [audioInfo, setAudioInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const audioPlayerRef = useRef(null);
  const lastSyncTime = useRef(0);
  const [showPreSession, setShowPreSession] = useState(false);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const VITE_KEY = import.meta.env.VITE_PUSHER_KEY;
  const VITE_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER;

  const syncAudioState = useCallback((time, playing) => {
    if (audioPlayerRef.current) {
      const currentTime = audioPlayerRef.current.currentTime;
      const timeDiff = Math.abs(currentTime - time);

      if (timeDiff > 0.5) {
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
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching session data:", error);
        setError("Failed to load session data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId, location.state, SERVER_URL]);

  useEffect(() => {
    const pusher = new Pusher(VITE_KEY, { cluster: VITE_CLUSTER });
    const channel = pusher.subscribe(`session-${sessionId}`);

    channel.bind("audio-sync", (data) => {
      syncAudioState(data.currentTime, data.isPlaying);
    });

    channel.bind("participant-joined", (data) => {
      setSession((prevSession) => ({
        ...prevSession,
        participants: [...prevSession.participants, data.participantName],
      }));
    });

    channel.bind("participant-left", (data) => {
      setSession((prevSession) => ({
        ...prevSession,
        participants: prevSession.participants.filter(
          (name) => name !== data.participantName
        ),
      }));
    });

    return () => {
      pusher.unsubscribe(`session-${sessionId}`);
    };
  }, [sessionId, VITE_KEY, VITE_CLUSTER, syncAudioState]);

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
          if (!isAdmin) {
            setShowPreSession(true);
          } else {
            syncAudioState(
              syncResponse.data.currentTime,
              syncResponse.data.isPlaying
            );
          }
        } catch (error) {
          console.error("Error joining session:", error);
          setError("Failed to join session. Please try again.");
        }
      }
    };

    joinSession();
  }, [sessionId, location.state, SERVER_URL, syncAudioState, isAdmin]);

  const handleStartListening = useCallback(() => {
    setShowPreSession(false);
    syncAudioState(currentTime, isPlaying);
  }, [currentTime, isPlaying, syncAudioState]);

  const handleTimeUpdate = useCallback(
    (time) => {
      setCurrentTime(time);
      if (isAdmin) {
        const now = Date.now();
        if (now - lastSyncTime.current > 500) {
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
      if (audioPlayerRef.current) {
        if (playing) {
          audioPlayerRef.current.play();
        } else {
          audioPlayerRef.current.pause();
        }
      }

      if (isAdmin) {
        axios
          .post(`${SERVER_URL}/api/sessions/${sessionId}/sync`, {
            currentTime: audioPlayerRef.current?.currentTime || 0,
            isPlaying: playing,
          })
          .catch((error) => {
            console.error("Error syncing play/pause state:", error);
            setIsPlaying(!playing);
          });
      }
    },
    [isAdmin, sessionId, SERVER_URL]
  );

  //const handleNavigateBack = useCallback(() => navigate(-1), [navigate]);

  const memoizedAdminView = useMemo(
    () =>
      session && audioInfo ? (
        <AdminView
          session={session}
          audioInfo={audioInfo}
          audioPlayerRef={audioPlayerRef}
          handleTimeUpdate={handleTimeUpdate}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          currentTime={currentTime}
        />
      ) : null,
    [
      session,
      audioInfo,
      handleTimeUpdate,
      handlePlayPause,
      isPlaying,
      currentTime,
    ]
  );

  const memoizedParticipantView = useMemo(
    () =>
      session && audioInfo ? (
        <ParticipantView
          session={session}
          audioInfo={audioInfo}
          audioPlayerRef={audioPlayerRef}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onTimeUpdate={handleTimeUpdate}
          onPlayPause={handlePlayPause}
        />
      ) : null,
    [
      session,
      audioInfo,
      isPlaying,
      currentTime,
      handleTimeUpdate,
      handlePlayPause,
    ]
  );

  const memoizedPreSessionScreen = useMemo(
    () =>
      session && audioInfo ? (
        <PreSessionScreen
          session={session}
          audioInfo={audioInfo}
          onStartListening={handleStartListening}
        />
      ) : null,
    [session, audioInfo, handleStartListening]
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!session || !audioInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No session data available. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      {/* Outer container for mobile and larger screens */}
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl max-w-[301px] md:max-w-[1024px] h-[489px] overflow-hidden">
        {/* Scrollable content area inside the mockup */}
        <div className="rounded-lg overflow-y-auto bg-white dark:bg-gray-800 h-[450px]">
          <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src="/img/logo1.png"
                  alt="LoudTogether Logo"
                  className="w-8 h-8 mr-4"
                />
                <h1 className="text-3xl font-bold text-gray-800">
                  LoudTogether
                </h1>
              </div>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Breadcrumb */}
          <div className="px-4 py-2">
            <Breadcrumb className="flex items-center">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-[#17D9A3] hover:text-[#15c795] text-3xl flex items-center"
                >
                  <Home className="w-8 h-8 mr-2 inline" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span className="mx-2 text-gray-400">|</span>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="font-semibold text-3xl">
                  Create Session
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Form for creating session */}
          <div className="flex-grow flex items-center justify-center px-4">
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-center text-[#17D9A3]">
                  {isAdmin ? "Admin View" : "Participant View"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">{audioInfo.title}</h2>
                  <p className="text-sm text-gray-500">
                    Session ID: {sessionId}
                  </p>
                </div>
                {isAdmin
                  ? memoizedAdminView
                  : showPreSession
                  ? memoizedPreSessionScreen
                  : memoizedParticipantView}
                <Button
                  onClick={() => setShowParticipants(true)}
                  className="mt-4 w-full bg-[#17D9A3] text-white"
                >
                  <Users className="mr-2 h-4 w-4" /> View Participants
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AppDock and HomeIndicator */}
          <div className="absolute bottom-4 w-full">
            <div className="flex justify-center mt-2">
              <HomeIndicator
                width="w-32"
                height="h-2"
                color="bg-blue-500"
                animate={true}
                darkMode={true}
              />
            </div>
            {showParticipants && (
              <ParticipantsModal
                participants={session.participants}
                onClose={() => setShowParticipants(false)}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="bg-[#17D9A3] text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <p>&copy; 2024 LoudTogether. All rights reserved.</p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-gray-300">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[50px] max-w-[351px] md:max-w-7xl">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[196px] md:h-[8px] bg-gray-800"></div>
      </div>
    </>
  );
});

Session.displayName = "Session";

export default Session;
