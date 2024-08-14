// AudioControls.jsx

import PropTypes from "prop-types";
import { Play, Pause } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

const AudioControls = ({
  audioPlayerRef,
  audioUrl,
  isAdmin,
  onTimeUpdate,
  onPlayPause,
  isPlaying,
}) => (
  <div className="bg-gray-100 rounded-xl p-4 mb-6">
    <AudioPlayer
      ref={audioPlayerRef}
      audioUrl={audioUrl}
      isAdmin={isAdmin}
      onTimeUpdate={onTimeUpdate}
      onPlayPause={onPlayPause}
    />
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPlayPause(!isPlaying)}
        className="bg-[#17D9A3] text-white rounded-full p-3 hover:bg-[#15c795] transition-colors"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  </div>
);

AudioControls.propTypes = {
  audioPlayerRef: PropTypes.object.isRequired,
  audioUrl: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default AudioControls;
