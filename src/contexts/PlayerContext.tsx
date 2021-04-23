import {createContext, useState, ReactNode, useContext} from 'react';

type Episode = {
    title:string;
    members:string;
    thumbnail:string;
    duration:number;
    url:string;
};


type PlayerContextData = {
    episodeList:Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    hasPrevious:boolean;
    hasNext:boolean;
    play:(episode:Episode) => void;
    playList:(list : Episode[], index: number) => void;
    setPlayingState:(state:Boolean) => void;
    tooglePlay: () =>void;
    toogleLoop: () =>void;
    toogleShuffle: () =>void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
    children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);


export function PlayerContextProvider({children}:PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function playList(list: Episode[], index: number){
        console.log(list);
       setEpisodeList(list);
       setCurrentEpisodeIndex(index);
       setIsPlaying(true);
    }
  
    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    } 
  
    function tooglePlay(){
      setIsPlaying(!isPlaying);
    }

    function toogleLoop(){
        setIsLooping(!isLooping);
    }

    function toogleShuffle(){
        setIsShuffling(!isShuffling);
    }
  
    function setPlayingState(statte:boolean){
      setIsPlaying(statte);
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;


    function playNext(){
        if (isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex+1);
        }
    }

    function playPrevious(){
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex-1);
        }
    }
  
    return (
      <PlayerContext.Provider value={
          {episodeList,
          currentEpisodeIndex,
          play,
          playList,
          playNext,
          playPrevious,
          isPlaying,
          isLooping,
          isShuffling,
          tooglePlay,
          toogleLoop,
          toogleShuffle,
          hasPrevious,
          hasNext,
          setPlayingState,
          clearPlayerState}
        }>
          {children}
      </PlayerContext.Provider>
    );
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}