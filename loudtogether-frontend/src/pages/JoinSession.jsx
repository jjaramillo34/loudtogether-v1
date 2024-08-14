import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatusBar from "../components/StatusBar";
import Background from "../components/Background";
import HomeIndicator from "../components/HomeIndicator";

function JoinSession() {
  const [sessionId, setSessionId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSessionId = sessionId.split("/").pop();
    navigate(`/session/${cleanSessionId}`, { state: { participantName } });
  };

  return (
    <div className="max-w-md mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
      {/* Status Bar */}
      <StatusBar />

      {/* Background Design */}
      <Background />

      {/* Content */}
      <div className="flex-grow flex flex-col px-8 relative z-10">
        <div className="flex items-center mt-6">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft size={24} color="#17D9A3" />
          </button>
          <h1 className="text-2xl font-bold">Join Session</h1>
        </div>

        {/* Centered Form */}
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label
                htmlFor="sessionId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Session ID
              </label>
              <input
                type="text"
                id="sessionId"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17D9A3]"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="participantName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="participantName"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17D9A3]"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#17D9A3] text-white rounded-2xl py-3 px-6 text-center font-semibold shadow-lg transform transition duration-200 hover:bg-[#15c795]"
            >
              Join Session
            </button>
          </form>
        </div>
      </div>

      {/* Home Indicator */}
      <HomeIndicator />
    </div>
  );
}

export default JoinSession;
