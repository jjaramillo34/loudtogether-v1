import { Link } from "react-router-dom";
import StatusBar from "../../components/StatusBar";
import HomeIndicator from "../../components/HomeIndicator";
import Background from "../../components/Background";
import AppDock from "../../components/AppDock";

const HomeTablet = () => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[682px] w-[512px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

      <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
        <div className="relative h-full">
          {/* Background component */}
          <div>
            <Background />
          </div>

          {/* StatusBar component */}
          <StatusBar />

          {/* App main content */}
          <div className="flex flex-col items-center justify-center mt-28 mb-8">
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
            <Link to="/create-tab" className="block w-full">
              <button className="bg-[#17D9A3] text-white rounded-2xl py-4 px-6 text-center font-semibold text-xl shadow-lg transition duration-200 hover:scale-105 hover:bg-[#15c795] w-full">
                Create Room
              </button>
            </Link>
            <Link to="/join-tab" className="block w-full">
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
        </div>
      </div>
    </div>
  );
};

export default HomeTablet;
