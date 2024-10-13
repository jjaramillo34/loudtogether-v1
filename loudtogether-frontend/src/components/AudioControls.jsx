import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlayIcon, PauseIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { Slider } from "../components/ui/slider";
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
  onTimeUpdate,
  onPlayPause,
  isPlaying,
  currentTime,
}) {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  //const progressRef = useRef(null);

  useEffect(() => {
    const audioElement = audioPlayerRef.current;
    if (audioElement) {
      const handleTimeUpdate = () => {
        onTimeUpdate(audioElement.currentTime);
      };
      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [audioPlayerRef, onTimeUpdate]);

  useEffect(() => {
    if (audioPlayerRef.current) {
      if (Math.abs(audioPlayerRef.current.currentTime - currentTime) > 1) {
        audioPlayerRef.current.currentTime = currentTime;
      }
      if (isPlaying && audioPlayerRef.current.paused) {
        audioPlayerRef.current.play();
      } else if (!isPlaying && !audioPlayerRef.current.paused) {
        audioPlayerRef.current.pause();
      }
      audioPlayerRef.current.volume = isMuted ? 0 : volume;
    }
  }, [currentTime, isPlaying, audioPlayerRef, volume, isMuted]);

  const handlePlayPause = () => {
    //if (isAdmin) {
    onPlayPause(!isPlaying);
    //}
  };

  const handleSeek = (value) => {
    if (isAdmin && audioPlayerRef.current) {
      const seekTime = (value[0] / 100) * duration;
      audioPlayerRef.current.currentTime = seekTime;
      onTimeUpdate(seekTime);
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.muted = !isMuted;
    }
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
        <Slider
          value={[(currentTime / duration) * 100]}
          onValueChange={handleSeek}
          max={100}
          step={1}
          disabled={!isAdmin}
          className="w-full mb-4"
        />
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeXIcon className="w-5 h-5" />
                  ) : (
                    <Volume2Icon className="w-5 h-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? "Unmute" : "Mute"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-32"
          />
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
