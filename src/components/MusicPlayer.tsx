import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  Previous,
  Next,
  VolumeHigh,
  Shuffle,
} from "iconsax-react";
import { useMusicPlayerContext } from "../context/MusicPlayerContext";

interface MusicPlayerProps {
  musicPaths: string[];
  musicTitles: string[];
  onBackgroundChange: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicPaths,
  musicTitles,
  onBackgroundChange,
}) => {
  const { isPlaying, setIsPlaying, currentTime, setCurrentTime } =
    useMusicPlayerContext();
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(90);

  useEffect(() => {
    const audio = new Audio();
    audio.src = musicPaths[currentMusicIndex];
    audio.loop = true;
    setAudioPlayer(audio);

    if (isPlaying) {
      audio.currentTime = currentTime;
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [currentMusicIndex, isPlaying, currentTime, musicPaths]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.volume = volume / 100;
    }
  }, [volume, audioPlayer]);

  useEffect(() => {
    const videoElement = document.getElementById(
      "music-video"
    ) as HTMLVideoElement;

    if (isPlaying) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [isPlaying]);

  const currentMusic = musicTitles[currentMusicIndex];

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioPlayer?.play();
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentTime(audioPlayer?.currentTime || 0);
      audioPlayer?.pause();
    }
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentMusicIndex((prevIndex) => (prevIndex + 1) % musicPaths.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentMusicIndex(
      (prevIndex) => (prevIndex - 1 + musicPaths.length) % musicPaths.length
    );
    setIsPlaying(true);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
  };

  const handleShuffleClick = () => {
    onBackgroundChange();
    setCurrentTime(audioPlayer?.currentTime || 0);
    audioPlayer?.play();
  };

  return (
    <>
      <div
        className="absolute top-0 left-1/2 p-2 mt-6 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-90 md:tooltip md:tooltip-bottom"
        onClick={handleShuffleClick}
        data-tip="Change Background"
      >
        <Shuffle size={18} color="white" className="cursor-pointer" />
      </div>
      <div className="absolute left-0 bottom-0">
        <div className="flex flex-col bg-black opacity-80 space-y-3 p-6 rounded-se-lg w-screen md:w-full">
          <div>
            <div className="text-white">{currentMusic}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-full w-20">
              <video id="music-video" autoPlay={isPlaying} muted loop>
                <source src="wave.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex space-x-1">
              <div
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20"
                onClick={handlePrevious}
              >
                <Previous variant="Bold" color="white" />
              </div>
              <div
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20"
                onClick={isPlaying ? handlePause : handlePlay}
              >
                {isPlaying ? (
                  <Pause color="white" fill="white" />
                ) : (
                  <Play color="white" fill="white" />
                )}
              </div>
              <div
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20"
                onClick={handleNext}
              >
                <Next variant="Bold" color="white" />
              </div>
              <div className="dropdown dropdown-left md:dropdown-right">
                <div
                  tabIndex={0}
                  className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20"
                >
                  <VolumeHigh color="white" />
                  <div
                    tabIndex={0}
                    className="dropdown-content menu p-2 bg-black rounded-box w-52"
                  >
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      className="range range-sm"
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
