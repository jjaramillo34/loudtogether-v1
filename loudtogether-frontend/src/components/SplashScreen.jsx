const SplashScreen = () => (
  <div className="max-w-md mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#17D9A3] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <div className="text-2xl font-semibold text-[#17D9A3]">Loading...</div>
      </div>
    </div>
  </div>
);

export default SplashScreen;
