import { Music, MessageSquare, Camera, Settings } from "lucide-react";

const AppDock = () => {
  return (
    <div className="bg-gray-100 rounded-3xl mx-4 mb-8 p-4 relative z-10">
      <div className="flex justify-around">
        <div className="w-12 h-12 bg-[#17D9A3] rounded-xl flex items-center justify-center">
          <Music size={24} color="white" />
        </div>
        <div className="w-12 h-12 bg-[#17D9A3] rounded-xl flex items-center justify-center">
          <MessageSquare size={24} color="white" />
        </div>
        <div className="w-12 h-12 bg-[#17D9A3] rounded-xl flex items-center justify-center">
          <Camera size={24} color="white" />
        </div>
        <div className="w-12 h-12 bg-[#17D9A3] rounded-xl flex items-center justify-center">
          <Settings size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export default AppDock;
