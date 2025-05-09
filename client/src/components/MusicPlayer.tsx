import { useContext, useRef, useEffect, useState, useCallback, memo, useMemo } from "react";
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

function MusicPlayer() {
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

  // Usar useMemo para playlist para evitar recriação a cada render
  const playlist = useMemo<Song[]>(() => [
    {
      id: 0,
      title: "Around The World",
      artist: "Piano Version",
      url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-9835.mp3",
      cover: "/vinil-placeholder.png" // Placeholder alternativo ao invés de imagem de piano
    },
    {
      id: 1,
      title: "Cochise",
      artist: "Piano Cover",
      url: "https://cdn.pixabay.com/download/audio/2021/08/08/audio_88447e769c.mp3?filename=tuesday-glitch-soft-piano-notification-sound-7074.mp3",
      cover: "/vinil-placeholder.png"
    },
    {
      id: 2,
      title: "What You Are",
      artist: "Piano Solo",
      url: "https://cdn.pixabay.com/download/audio/2021/04/07/audio_c8c2fb1eb6.mp3?filename=sad-piano-11239.mp3",
      cover: "/vinil-placeholder.png"
    }
  ], []);

  // Efeito para gerenciar event listeners do áudio - simplificado
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Event handlers definidos dentro do efeito para evitar problemas com hooks
    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      // Otimizado para limitar atualizações do estado quando a diferença for significativa
      if (Math.abs(audioRef.current.currentTime - currentTime) > 0.5) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (!audioRef.current) return;
      setDuration(audioRef.current.duration);
    };

    const handleEnded = () => {
      nextSong();
    };

    // Adicionar event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTime, nextSong]);

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

  // Otimização: Memo para o componente de visualizador da playlist
  const PlaylistItem = memo(({ song, index, isCurrentSong, isPlaying, onSelect }: { 
    song: Song, 
    index: number, 
    isCurrentSong: boolean, 
    isPlaying: boolean,
    onSelect: () => void 
  }) => (
    <motion.div 
      key={song.id}
      className={`flex items-center p-2 hover:bg-white/5 cursor-pointer clickable ${isCurrentSong ? 'bg-white/10' : ''}`}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-8 h-8 mr-3 flex items-center justify-center bg-gray-800 rounded-sm overflow-hidden border border-white/20">
        <Music size={16} className="text-white/70" />
      </div>
      <div>
        <p className="font-mono text-sm">{song.title}</p>
        <p className="font-mono text-xs text-gray-400">{song.artist}</p>
      </div>
      {isCurrentSong && isPlaying && (
        <div className="ml-auto flex space-x-1">
          <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </motion.div>
  ));

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
        
        {/* Playlist panel - com lazy loading otimizado */}
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
                  <PlaylistItem 
                    key={song.id}
                    song={song}
                    index={index}
                    isCurrentSong={index === currentSong}
                    isPlaying={isPlaying}
                    onSelect={() => setCurrentSong(index)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// Exporta o componente memoizado para evitar re-renders desnecessários
export default memo(MusicPlayer);
