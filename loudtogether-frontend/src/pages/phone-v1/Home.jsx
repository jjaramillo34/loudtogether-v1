import { Link } from "react-router-dom";
import StatusBar from "../../components/StatusBar";
import HomeIndicator from "../../components/HomeIndicator";
import Background from "../../components/Background";
import AppDock from "../../components/AppDock";

const HomeTablet = () => {
  return (
    <div className="max-w-[1366px] mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
      {/* Status Bar */}
      <StatusBar />

      {/* Background Design */}
      <Background />

      {/* Content */}
      <div className="flex-grow flex justify-center items-center px-16 relative z-10">
        <div className="w-1/2 pr-8 flex flex-col items-center">
          <img
            src="/img/logo1.png"
            alt="LoudTogether Logo"
            className="w-48 h-48 mb-8"
          />
          <h1 className="text-6xl font-bold mb-8 text-center text-gray-800">
            LoudTogether
          </h1>
          <p className="text-2xl text-gray-600 mb-8 text-center">
            Connect and collaborate in real-time
          </p>
        </div>
        <div className="w-1/2 pl-8 space-y-8">
          <Link to="/create" className="block">
            <div className="bg-[#17D9A3] text-white rounded-2xl py-6 px-8 text-center font-semibold text-2xl shadow-lg transform transition duration-200 hover:scale-105 hover:bg-[#15c795]">
              Create Session
            </div>
          </Link>
          <Link to="/join" className="block">
            <div className="bg-[#17D9A3] text-white rounded-2xl py-6 px-8 text-center font-semibold text-2xl shadow-lg transform transition duration-200 hover:scale-105 hover:bg-[#15c795]">
              Join Session
            </div>
          </Link>
        </div>
      </div>

      {/* App Dock */}
      <AppDock />

      {/* Home Indicator */}
      <HomeIndicator
        width="w-64"
        height="h-2"
        color="bg-blue-500"
        animate={true}
        darkMode={true}
      />
    </div>
  );
};

export default HomeTablet;
