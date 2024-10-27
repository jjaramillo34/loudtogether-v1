<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import AppDock from "../../components/AppDock";
import StatusBar from "../../components/StatusBar";
import HomeIndicator from "../../components/HomeIndicator";
>>>>>>> origin/main
import Background from "../../components/Background";

import { Link } from "react-router-dom";

const Home = () => {
  return (
<<<<<<< HEAD
    <div className="max-w-7xl mx-auto text-gray-800 min-h-screen flex flex-col rounded-[2rem] overflow-hidden relative p-4 md:p-8">
      {/* Background Design */}
      <Background />

      {/* Content */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:px-16 px-4 py-8 lg:py-16 relative z-10 gap-10 lg:gap-16">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src="/img/loudpng-ai.png"
            alt="LoudTogether Logo"
            className="w-2/3 sm:w-1/2 lg:w-full max-w-md mb-4 lg:mb-8"
          />
          <div className="flex items-center gap-4 mb-4 lg:mb-8">
            <img
              src="/img/logo1.png"
              alt="LoudTogether Logo"
              className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              LoudTogether
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 lg:mb-8 max-w-lg">
            Connect and collaborate in real-time
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-4">
          <Link to="/create" className="block w-full">
            <button className="bg-gradient-to-r from-[#17D9A3] to-[#15c795] text-white rounded-full py-3 lg:py-5 px-6 lg:px-10 text-center font-semibold text-lg lg:text-2xl shadow-lg transition-all duration-200 hover:scale-105 w-56 md:w-72 lg:w-80">
              Create Session
            </button>
          </Link>
          <Link to="/join" className="block w-full">
            <button className="bg-gradient-to-r from-[#17D9A3] to-[#15c795] text-white rounded-full py-3 lg:py-5 px-6 lg:px-10 text-center font-semibold text-lg lg:text-2xl shadow-lg transition-all duration-200 hover:scale-105 w-56 md:w-72 lg:w-80">
              Join Session
            </button>
          </Link>
=======
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div className="relative h-full">
          {/* Background component */}
          <div>
            <Background />
          </div>

          {/* StatusBar component */}
          <StatusBar />

          {/* App main content */}
          <div className="flex flex-col items-center justify-center mt-20 mb-8">
            <div className="flex items-center justify-center mx-auto gap-2">
              <img
                src="/img/logo1.png"
                alt="LoudTogether Logo"
                className="w-8"
              />
              <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                LoudTogether
              </h1>
            </div>
            <p className="text-md text-gray-600 dark:text-gray-300 text-center">
              Connect and collaborate in real-time
            </p>
          </div>

          {/* Buttons for 'Create' and 'Join' */}
          <div className="flex flex-col items-center gap-4 mb-8 z-50 absolute w-full p-4">
            <Link to="/create-phone" className="block w-full">
              <button className="bg-[#17D9A3] text-white rounded-2xl py-4 px-6 text-center font-semibold text-xl shadow-lg transition duration-200 hover:scale-105 hover:bg-[#15c795] w-full">
                Create Room
              </button>
            </Link>
            <Link to="/join-phone" className="block w-full">
              <button className="bg-[#17D9A3] text-white rounded-2xl py-4 px-6 text-center font-semibold text-xl shadow-lg transition duration-200 hover:scale-105 hover:bg-[#15c795] w-full">
                Join Room
              </button>
            </Link>
          </div>

          {/* AppDock and HomeIndicator */}
          <div className="absolute bottom-4 w-full">
            <AppDock />
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
>>>>>>> origin/main
        </div>
      </div>
    </div>
  );
};

export default Home;
