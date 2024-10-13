import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Hash } from "lucide-react";
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

const JoinSession = React.memo(() => {
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
              Join Session
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex-grow flex items-center justify-center">
          <Card className="shadow-lg bg-white/90 backdrop-blur-sm w-full max-w-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center text-[#17D9A3]">
                Join Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="sessionId"
                    className="block text-sm font-medium text-gray-700"
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
                    className="block text-sm font-medium text-gray-700"
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
                  className="w-full bg-[#17D9A3] text-white rounded-xl py-4 text-center font-semibold shadow-md transform transition duration-200 hover:bg-[#15c795] hover:shadow-lg"
                >
                  Join Session
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <HomeIndicator />
    </div>
  );
});

JoinSession.displayName = "JoinSession";

export default JoinSession;
