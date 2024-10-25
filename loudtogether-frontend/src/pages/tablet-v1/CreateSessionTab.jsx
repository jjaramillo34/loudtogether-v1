import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Home, Youtube, User } from "lucide-react";
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

function CreateSessionTab() {
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
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[682px] w-[512px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

      <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
        <div className="relative h-full">
          {/* Background */}
          <Background />

          {/* StatusBar */}
          <StatusBar />

          {/* Breadcrumb */}
          <div className="px-4 py-2 absolute">
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
          <div className="flex-grow flex items-center justify-center px-4 mt-36">
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm w-full max-w-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl font-bold text-center text-[#17D9A3]">
                  Create Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="youtubeUrl"
                      className="block text-lg font-medium text-gray-700"
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
                      className="block text-lg font-medium text-gray-700"
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
                    className="w-full bg-[#17D9A3] text-white rounded-xl py-4 text-center font-semibold shadow-md transform transition duration-200 hover:scale-105 hover:bg-[#15c795] text-lg"
                  >
                    Create Session
                  </Button>
                </form>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionTab;
