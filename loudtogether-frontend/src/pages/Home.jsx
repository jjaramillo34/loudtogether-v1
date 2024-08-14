import { Link } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import HomeIndicator from "../components/HomeIndicator";
import Background from "../components/Background";
import AppDock from "../components/AppDock";

const Home = () => {
  return (
    <div className="max-w-md mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
      {/* Status Bar */}
      <StatusBar />

      {/* Background Design */}
      <Background />

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center px-8 relative z-10">
        <img
          src="/img/logo1.png"
          alt="LoudTogether Logo"
          className="w-32 h-32 mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
          LoudTogether
        </h1>
        <div className="space-y-6">
          <Link to="/create" className="block">
            <div className="bg-[#17D9A3] text-white rounded-2xl py-5 px-6 text-center font-semibold shadow-lg transform transition duration-200 hover:scale-105 hover:bg-[#15c795]">
              Create Session
            </div>
          </Link>
          <Link to="/join" className="block">
            <div className="bg-[#17D9A3] text-white rounded-2xl py-5 px-6 text-center font-semibold shadow-lg transform transition duration-200 hover:scale-105 hover:bg-[#15c795]">
              Join Session
            </div>
          </Link>
        </div>
      </div>

      {/* App Dock */}
      <AppDock />

      {/* Home Indicator */}
      <HomeIndicator />
    </div>
  );
};

export default Home;
