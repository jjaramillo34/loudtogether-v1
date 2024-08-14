import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import StatusBar from "../components/StatusBar";
import Background from "../components/Background";
import HomeIndicator from "../components/HomeIndicator";

function CreateSession() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const SERVER_URL1 = import.meta.env.SERVER_URL;

  console.log(SERVER_URL, SERVER_URL1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/api/sessions`, {
        youtubeUrl,
        adminName,
      });
      navigate(`/session/${response.data.sessionId}`, {
        state: { participantName: adminName },
      });
    } catch (error) {
      console.error("Error creating session:", error);
    }
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
          <h1 className="text-2xl font-bold">Create Session</h1>
        </div>

        {/* Centered Form */}
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label
                htmlFor="youtubeUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                YouTube URL
              </label>
              <input
                type="text"
                id="youtubeUrl"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17D9A3]"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="adminName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name (Admin)
              </label>
              <input
                type="text"
                id="adminName"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17D9A3]"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#17D9A3] text-white rounded-2xl py-3 px-6 text-center font-semibold shadow-lg transform transition duration-200 hover:bg-[#15c795]"
            >
              Create Session
            </button>
          </form>
        </div>
      </div>

      {/* Home Indicator */}
      <HomeIndicator />
    </div>
  );
}

export default CreateSession;
