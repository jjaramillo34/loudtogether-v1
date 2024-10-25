import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Hash } from "lucide-react";
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

const JoinSessionWeb = React.memo(() => {
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
                  Join Session
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Form for joining session */}
          <div className="flex-grow flex items-center justify-center px-4">
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm w-full max-w-xl">
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
                      className="block text-xl font-medium text-gray-700"
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
                      className="block text-xl font-medium text-gray-700"
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
                    className="w-full bg-[#17D9A3] text-white rounded-xl py-4 text-center font-semibold shadow-md transform transition duration-200 hover:scale-105 hover:bg-[#15c795] text-xl"
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

JoinSessionWeb.displayName = "JoinSession";

export default JoinSessionWeb;
