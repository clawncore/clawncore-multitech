import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc?: string;
  title?: string;
}

export function VideoPlayer({ videoSrc, thumbnailSrc, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && videoRef.current) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <div className="relative aspect-video">
        {thumbnailSrc && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={thumbnailSrc}
              alt={title || "Video thumbnail"}
              className="w-full h-full object-cover"
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Play className="text-slate-900 ml-0.5 md:ml-1" size={16} />
              </div>
            </button>
          </div>
        )}

        <video
          ref={videoRef}
          src={videoSrc}
          className={`w-full h-full ${thumbnailSrc && !isPlaying ? 'hidden' : 'block'}`}
          onTimeUpdate={handleProgress}
          onEnded={() => setIsPlaying(false)}
        />

        {!thumbnailSrc && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              {isPlaying ? <Pause className="text-slate-900" size={16} /> : <Play className="text-slate-900 ml-0.5 md:ml-1" size={16} />}
            </div>
          </button>
        )}
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 md:p-4">
        {/* Progress Bar */}
        <div className="mb-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 md:h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={togglePlay} className="text-slate-900 hover:text-blue-600">
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            <button onClick={restartVideo} className="text-slate-900 hover:text-blue-600">
              <RotateCcw size={16} />
            </button>

            <button onClick={toggleMute} className="text-slate-900 hover:text-blue-600 hidden md:block">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="hidden md:block w-16 h-1 md:h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />

            <span className="text-slate-900 text-xs md:text-sm">
              {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'} / {
                videoRef.current ? formatTime(videoRef.current.duration) : '0:00'
              }
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {title && <span className="hidden md:block text-slate-900 text-xs md:text-sm font-medium">{title}</span>}
            <button onClick={toggleFullscreen} className="text-slate-900 hover:text-blue-600">
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}