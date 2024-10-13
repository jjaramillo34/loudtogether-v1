import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Home, Youtube, User } from "lucide-react";
import { motion } from "framer-motion";
import StatusBar from "../../components/StatusBar";
import Background from "../../components/Background";
import HomeIndicator from "../../components/HomeIndicator";
import { Input } from "../../components/ui/input";
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

function CreateSession() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while creating the session. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
      <StatusBar />
      <Background />

      <motion.div
        className="flex-grow flex flex-col px-8 pt-6 pb-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-[#17D9A3] hover:text-[#15c795]"
            >
              <Home className="w-4 h-4 mr-2 inline" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className="mx-2 text-gray-400">|</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-semibold">
              Create Session
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex-grow flex items-center justify-center">
          <Card className="shadow-lg bg-white/90 backdrop-blur-sm w-full max-w-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center text-[#17D9A3]">
                Create Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="youtubeUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    YouTube URL
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="youtubeUrl"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      required
                      className="pl-10 rounded-xl"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <Youtube
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="adminName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name (Admin)
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="adminName"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      required
                      className="pl-10 rounded-xl"
                      placeholder="Enter your name"
                    />
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#17D9A3] text-white rounded-xl py-4 text-center font-semibold shadow-md transform transition duration-200 hover:bg-[#15c795] hover:shadow-lg"
                >
                  Create Session
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <HomeIndicator />
    </div>
  );
}

export default CreateSession;
