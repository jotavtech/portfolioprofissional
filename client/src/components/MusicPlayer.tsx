import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { motion } from "framer-motion";

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist: Song[] = [
    {
      id: 1,
      title: "Around The World",
      artist: "Red Hot Chili Peppers",
      url: "https://cdn.pixabay.com/download/audio/2022/11/10/audio_35daee81be.mp3?filename=the-best-jazzy-new-york-15550.mp3"
    },
    {
      id: 2,
      title: "Cochise",
      artist: "Audioslave",
      url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_ccebd5a3e7.mp3?filename=forest-15012.mp3"
    },
    {
      id: 3,
      title: "What You Are",
      artist: "Audioslave",
      url: "https://cdn.pixabay.com/download/audio/2022/10/13/audio_2334d48853.mp3?filename=tech-house-vibes-130bpm-7741.mp3"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (currentSong < playlist.length - 1) {
        setCurrentSong(currentSong + 1);
      } else {
        setCurrentSong(0);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, playlist.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentSong(prev => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSong(prev => (prev === playlist.length - 1 ? 0 : prev + 1));
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    audioRef.current.currentTime = pos * duration;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 w-full bg-black border-t border-white/20 music-player z-40 group">
      <audio 
        ref={audioRef} 
        src={playlist[currentSong].url}
        preload="metadata"
      />
      
      <div className="music-progress cursor-pointer" onClick={handleProgressClick}>
        <motion.div 
          className="progress-bar bg-white h-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            className="mr-4 clickable" 
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div>
            <p className="font-retro text-xs md:text-sm">NOW PLAYING</p>
            <p className="font-mono text-xs opacity-70 mt-1">{playlist[currentSong].title} - {playlist[currentSong].artist}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline-block text-xs font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button className="clickable" onClick={handlePrevious}>
            <SkipBack size={20} />
          </button>
          <button className="clickable" onClick={handleNext}>
            <SkipForward size={20} />
          </button>
          <button className="clickable" onClick={handleVolumeToggle}>
            {isMuted ? <VolumeX size={20} /> : 
             volume < 0.3 ? <Volume1 size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
