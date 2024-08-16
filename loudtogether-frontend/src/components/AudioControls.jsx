import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AudioControls = ({
  audioPlayerRef,
  audioUrl,
  isAdmin,
  onTimeUpdate,
  onPlayPause,
  isPlaying,
  currentTime,
}) => {
  const progressRef = useRef(null);

  useEffect(() => {
    const audioElement = audioPlayerRef.current;
    if (audioElement) {
      const handleTimeUpdate = () => {
        onTimeUpdate(audioElement.currentTime);
      };
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
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
    }
  }, [currentTime, isPlaying, audioPlayerRef]);

  const handlePlayPause = () => {
    if (isAdmin) {
      onPlayPause(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (isAdmin && audioPlayerRef.current) {
      const seekTime =
        (e.nativeEvent.offsetX / progressRef.current.offsetWidth) *
        audioPlayerRef.current.duration;
      audioPlayerRef.current.currentTime = seekTime;
      onTimeUpdate(seekTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="audio-controls">
      <audio ref={audioPlayerRef} src={audioUrl} />
      <button onClick={handlePlayPause} disabled={!isAdmin}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div
        ref={progressRef}
        className="progress-bar"
        onClick={isAdmin ? handleSeek : undefined}
        style={{ cursor: isAdmin ? "pointer" : "default" }}
      >
        <div
          className="progress"
          style={{
            width: `${
              (currentTime / (audioPlayerRef.current?.duration || 1)) * 100
            }%`,
          }}
        />
      </div>
      <span>
        {formatTime(currentTime)} /{" "}
        {formatTime(audioPlayerRef.current?.duration || 0)}
      </span>
    </div>
  );
};

AudioControls.propTypes = {
  audioPlayerRef: PropTypes.object.isRequired,
  audioUrl: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
};

export default AudioControls;
