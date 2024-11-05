import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../@/components/ui/card";
import {
  Music,
  Users,
  PlayCircle,
  ListMusic,
  Share2,
  HomeIcon,
  Headphones,
} from "lucide-react";
import Background from "../../components/Background";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="relative w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 opacity-5" />

          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-12">
              {/* Left Side - Main Content */}
              <div className="lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/img/logo1.png"
                      alt="LoudTogether Logo"
                      className="w-16 h-16 lg:w-20 lg:h-20"
                    />
                    <h1 className="text-4xl lg:text-7xl font-bold bg-gradient-to-r from-[#17D9A3] to-[#15c795] bg-clip-text text-transparent">
                      LoudTogether
                    </h1>
                  </div>
                  <p className="text-xl lg:text-3xl text-gray-600 max-w-xl leading-tight">
                    Be Loud, Together. Sync your music moments with everyone you
                    love.
                  </p>
                  <p className="text-lg text-gray-500 max-w-xl">
                    Create synchronized listening experiences. Host playlists
                    that play in perfect harmony across all devices, bringing
                    people together through music.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/create">
                    <button className="w-full sm:w-auto bg-gradient-to-r from-[#17D9A3] to-[#15c795] text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:brightness-110 flex items-center justify-center gap-2">
                      <PlayCircle className="w-5 h-5" />
                      Host Session
                    </button>
                  </Link>
                  <Link to="/join">
                    <button className="w-full sm:w-auto bg-white text-[#17D9A3] border-2 border-[#17D9A3] rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-[#17D9A3] hover:text-white flex items-center justify-center gap-2">
                      <Users className="w-5 h-5" />
                      Join Session
                    </button>
                  </Link>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-3">
                  {[
                    "Synchronized Playback",
                    "Group Sessions",
                    "Cross-Platform",
                    "Instant Sharing",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side - Visual */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#17D9A3]/20 to-[#15c795]/20 blur-2xl rounded-full" />
                  <img
                    src="/img/loudpng-ai.png"
                    alt="Music Collaboration"
                    className="relative w-full max-w-2xl mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <PlayCircle className="w-8 h-8" />,
                  title: "Sync & Listen",
                  description:
                    "Experience music in perfect sync with friends and family",
                },
                {
                  icon: <ListMusic className="w-8 h-8" />,
                  title: "Host Playlists",
                  description:
                    "Create and share your ultimate playlist as the host",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Social Vibes",
                  description: "Join listening parties with your loved ones",
                },
                {
                  icon: <Share2 className="w-8 h-8" />,
                  title: "Share Moments",
                  description: "Connect through music, anywhere, anytime",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-gradient-to-br from-[#17D9A3]/10 to-[#15c795]/10 rounded-full">
                        <div className="text-[#17D9A3]">{feature.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="py-16 bg-white">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Perfect For Every Moment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Family Time",
                  description:
                    "Keep everyone's devices in sync with the perfect shared playlist",
                  icon: <HomeIcon className="w-6 h-6" />,
                },
                {
                  title: "Virtual Hangouts",
                  description:
                    "Host remote listening parties with friends across the globe",
                  icon: <Headphones className="w-6 h-6" />,
                },
                {
                  title: "Group Sessions",
                  description:
                    "Sync playlists for group activities and workouts",
                  icon: <Users className="w-6 h-6" />,
                },
              ].map((useCase, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="inline-block p-3 bg-[#17D9A3]/10 rounded-full mb-4">
                    <div className="text-[#17D9A3]">{useCase.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Loud?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start a session in seconds. No downloads required.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="text-gray-500">
                👥 {Math.floor(Math.random() * 100 + 400)} people listening now
              </span>
              <span className="text-gray-500">
                🎵 {Math.floor(Math.random() * 50 + 100)} active sessions
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
