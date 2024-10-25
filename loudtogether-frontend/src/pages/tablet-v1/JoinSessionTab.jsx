import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Hash } from "lucide-react";
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

const JoinSessionTab = React.memo(() => {
  const [sessionId, setSessionId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const cleanSessionId = sessionId.split("/").pop();
      navigate(`/session/${cleanSessionId}`, { state: { participantName } });
    },
    [sessionId, participantName, navigate]
  );

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
                  Join Session
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Form for joining session */}
          <div className="flex-grow flex items-center justify-center px-4 mt-20">
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm w-full max-w-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl font-bold text-center text-[#17D9A3]">
                  Join Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="sessionId"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Session ID
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="sessionId"
                        value={sessionId}
                        onChange={(e) => setSessionId(e.target.value)}
                        required
                        className="pl-10 rounded-xl"
                        placeholder="Enter session ID"
                      />
                      <Hash
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="participantName"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="participantName"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
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
                    Join Session
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
});

JoinSessionTab.displayName = "JoinSession";

export default JoinSessionTab;
