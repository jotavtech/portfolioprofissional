import { useContext, useRef, useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Music } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover?: string;
}

export default function MusicPlayer() {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    nextSong, 
    prevSong,
    setCurrentSong
  } = useContext(MusicPlayerContext);
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist: Song[] = [
    {
      id: 0,
      title: "Around The World",
      artist: "Red Hot Chili Peppers",
      url: "https://cdn.pixabay.com/download/audio/2022/11/10/audio_35daee81be.mp3?filename=the-best-jazzy-new-york-15550.mp3",
      cover: "https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?q=80&w=300&h=300&auto=format&fit=crop"
    },
    {
      id: 1,
      title: "Cochise",
      artist: "Audioslave",
      url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_ccebd5a3e7.mp3?filename=forest-15012.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&h=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "What You Are",
      artist: "Audioslave",
      url: "https://cdn.pixabay.com/download/audio/2022/10/13/audio_2334d48853.mp3?filename=tech-house-vibes-130bpm-7741.mp3",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&h=300&auto=format&fit=crop"
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
      nextSong();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [nextSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
        togglePlay();
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, togglePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

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

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  return (
    <>
      <div className="fixed bottom-0 w-full bg-black border-t border-white/20 music-player z-40 group shadow-glow">
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
          <div className="flex items-center gap-4">
            <button 
              className="mr-1 clickable" 
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
            
            <motion.div 
              className="h-10 w-10 bg-gray-800 rounded-sm overflow-hidden border border-white/20 hidden md:block"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={playlist[currentSong].cover} 
                alt={playlist[currentSong].title} 
                className="h-full w-full object-cover"
              />
            </motion.div>
            
            <div>
              <p className="font-retro text-xs md:text-sm">NOW PLAYING</p>
              <p className="font-mono text-xs opacity-70 mt-1">{playlist[currentSong].title} - {playlist[currentSong].artist}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-block text-xs font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button className="clickable" onClick={prevSong}>
              <SkipBack size={20} />
            </button>
            <button className="clickable" onClick={nextSong}>
              <SkipForward size={20} />
            </button>
            <button className="clickable" onClick={handleVolumeToggle}>
              {isMuted ? <VolumeX size={20} /> : 
               volume < 0.3 ? <Volume1 size={20} /> : <Volume2 size={20} />}
            </button>
            <button className="clickable hidden md:block" onClick={togglePlaylist}>
              <Music size={20} />
            </button>
          </div>
        </div>
        
        {/* Playlist panel */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              className="absolute bottom-full left-0 w-full bg-black/90 backdrop-blur-sm border-t border-white/20 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-retro text-lg mb-4">PLAYLIST</h3>
              <div className="grid gap-2">
                {playlist.map((song, index) => (
                  <motion.div 
                    key={song.id}
                    className={`flex items-center p-2 hover:bg-white/5 cursor-pointer clickable ${index === currentSong ? 'bg-white/10' : ''}`}
                    onClick={() => setCurrentSong(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 mr-3 bg-gray-800 rounded-sm overflow-hidden">
                      <img 
                        src={song.cover} 
                        alt={song.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-sm">{song.title}</p>
                      <p className="font-mono text-xs text-gray-400">{song.artist}</p>
                    </div>
                    {index === currentSong && isPlaying && (
                      <div className="ml-auto flex space-x-1">
                        <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
