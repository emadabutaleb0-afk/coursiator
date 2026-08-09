import { useState, useRef, useEffect } from 'react';
import { Volume2, Maximize, Play, Pause } from 'lucide-react';

interface ProtectedVideoPlayerProps {
  videoUrl: string;
  title: string;
  enableWatermark?: boolean;
  enableAntiRecord?: boolean;
  studentEmail?: string;
  studentIP?: string;
}

/**
 * Protected Video Player Component
 * Features:
 * - Dynamic watermarking with student email/IP
 * - Anti-recording protection (context menu disabled)
 * - Standard video controls
 * - Responsive design
 */

export default function ProtectedVideoPlayer({
  videoUrl,
  title,
  enableWatermark = true,
  enableAntiRecord = true,
  studentEmail = 'student@example.com',
  studentIP = '192.168.1.1',
}: ProtectedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [progress, setProgress] = useState(0);

  // Disable right-click context menu for anti-recording
  useEffect(() => {
    if (!enableAntiRecord || !containerRef.current) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const container = containerRef.current;
    container.addEventListener('contextmenu', handleContextMenu);

    return () => {
      container.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [enableAntiRecord]);

  // Disable keyboard shortcuts for recording
  useEffect(() => {
    if (!enableAntiRecord) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable common recording shortcuts
      if (
        (e.ctrlKey && e.shiftKey && e.key === 'S') || // Ctrl+Shift+S (Screenshot)
        (e.ctrlKey && e.key === 'p') || // Ctrl+P (Print)
        (e.key === 'F12') // F12 (Dev Tools)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enableAntiRecord]);

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

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.nativeEvent.offsetX;
      const barWidth = progressBar.offsetWidth;
      const seekTime = (clickPosition / barWidth) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-lg overflow-hidden group"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' } as React.CSSProperties}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        controlsList={enableAntiRecord ? 'nodownload' : undefined}
      />

      {/* Watermark Overlay */}
      {enableWatermark && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
          <div className="text-center text-white transform -rotate-45">
            <div className="text-2xl font-bold mb-2">{studentEmail}</div>
            <div className="text-lg">IP: {studentIP}</div>
            <div className="text-sm mt-2">© Coursiator - Protected Content</div>
          </div>
        </div>
      )}

      {/* Anti-Recording Notice */}
      {enableAntiRecord && (
        <div className="absolute top-4 right-4 bg-red-500/80 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 pointer-events-none">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Recording Protected
        </div>
      )}

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-accent transition-smooth"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="text-white hover:text-accent transition-smooth"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Title */}
          <span className="text-white text-sm font-semibold flex-1">{title}</span>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-accent transition-smooth"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div
          className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
          onClick={handleSeek}
        >
          <div className="h-full bg-accent" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-smooth cursor-pointer group">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-accent/80 hover:bg-accent flex items-center justify-center transition-smooth"
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </button>
        </div>
      )}
    </div>
  );
}
