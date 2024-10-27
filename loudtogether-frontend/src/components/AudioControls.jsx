import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlayIcon, PauseIcon } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

export default function AudioControls({
  audioPlayerRef,
  audioUrl,
  isAdmin,
  onPlayPause,
  isPlaying,
  currentTime,
}) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioElement = audioPlayerRef.current;
    if (audioElement) {
      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [audioPlayerRef]);

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = 1; // Set default volume when the component mounts
    }
  }, [audioPlayerRef]);

  const handlePlayPause = () => {
    onPlayPause(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl">
      <CardContent className="p-6">
        <audio ref={audioPlayerRef} src={audioUrl} />
        <div className="flex items-center justify-between mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handlePlayPause}
                  disabled={!isAdmin}
                  className="w-12 h-12 rounded-full bg-white text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-transform hover:scale-105"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isAdmin
                    ? isPlaying
                      ? "Pause"
                      : "Play"
                    : "Only admin can control playback"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-white font-medium">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

AudioControls.propTypes = {
  audioPlayerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  audioUrl: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
};
