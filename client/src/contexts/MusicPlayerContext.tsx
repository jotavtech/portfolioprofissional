import { createContext, useState, useEffect, ReactNode } from "react";

interface MusicPlayerContextProps {
  currentSong: number;
  previousSong: number | null;
  isPlaying: boolean;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setCurrentSong: (index: number) => void;
}

export const MusicPlayerContext = createContext<MusicPlayerContextProps>({
  currentSong: 0,
  previousSong: null,
  isPlaying: false,
  togglePlay: () => {},
  nextSong: () => {},
  prevSong: () => {},
  setCurrentSong: () => {},
});

interface MusicPlayerProviderProps {
  children: ReactNode;
}

export function MusicPlayerProvider({ children }: MusicPlayerProviderProps) {
  const [currentSong, setCurrentSong] = useState(0);
  const [previousSong, setPreviousSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextSong = () => {
    setPreviousSong(currentSong);
    setCurrentSong((prev) => (prev >= 2 ? 0 : prev + 1));
  };
  
  const prevSong = () => {
    setPreviousSong(currentSong);
    setCurrentSong((prev) => (prev <= 0 ? 2 : prev - 1));
  };
  
  const changeSong = (index: number) => {
    if (index !== currentSong) {
      setPreviousSong(currentSong);
      setCurrentSong(index);
    }
  };
  
  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        previousSong,
        isPlaying,
        togglePlay,
        nextSong,
        prevSong,
        setCurrentSong: changeSong,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}