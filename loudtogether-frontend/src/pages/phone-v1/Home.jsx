import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../@/components/ui/card";
import {
  Music,
  Users,
  Mic2,
  Radio,
  Laptop,
  Share2,
  Globe,
  Clock,
} from "lucide-react";
import Background from "../../components/Background";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Connect with musicians worldwide",
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Studio Quality",
      description: "Professional grade audio streaming",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Zero Latency",
      description: "Synchronized performance",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Create from anywhere",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="relative w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-5" />

          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-12">
              {/* Left Side - Main Content */}
              <motion.div
                className="lg:w-1/2 space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="space-y-4">
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
                  <p className="text-xl lg:text-3xl text-gray-600 max-w-xl">
                    Where musicians connect, create, and collaborate in perfect
                    harmony
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/create">
                    <button className="w-full sm:w-auto bg-gradient-to-r from-[#17D9A3] to-[#15c795] text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:brightness-110 flex items-center justify-center gap-2">
                      <Music className="w-5 h-5" />
                      Create Session
                    </button>
                  </Link>
                  <Link to="/join">
                    <button className="w-full sm:w-auto bg-white text-[#17D9A3] border-2 border-[#17D9A3] rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-[#17D9A3] hover:text-white flex items-center justify-center gap-2">
                      <Users className="w-5 h-5" />
                      Join Session
                    </button>
                  </Link>
                </motion.div>

                {/* Added Feature Tags */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    "Real-time Audio",
                    "Global Collaboration",
                    "Studio Quality",
                    "Zero Latency",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Side - Interactive Visual */}
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#17D9A3]/20 to-[#15c795]/20 blur-2xl rounded-full" />
                  <img
                    src="/img/loudpng-ai.png"
                    alt="Music Collaboration"
                    className="relative w-full max-w-2xl mx-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          className="py-16 bg-gradient-to-b from-white to-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <motion.div
                      className="flex flex-col items-center text-center space-y-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-3 bg-gradient-to-br from-[#17D9A3]/10 to-[#15c795]/10 rounded-full">
                        <div className="text-[#17D9A3]">{feature.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="py-16 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: "Musicians" },
                { value: "50,000+", label: "Sessions" },
                { value: "120+", label: "Countries" },
                { value: "4.9/5", label: "Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#17D9A3]">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center py-8 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg text-gray-600">
            Join thousands of musicians creating together
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
