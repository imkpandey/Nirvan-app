import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Sounds from "./components/Sounds";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import "./App.css"

function App() {
  const backgroundVideos: string[] = [
    "1.mp4",
    "2.mp4",
    "3.mp4",
    "4.mp4",
    "5.mp4",
    "6.mp4",
    "7.mp4",
    "9.mp4",
    "10.mp4",
    "11.mp4",
    "12.mp4",
    "14.mp4",
    "15.mp4",
  ];

  const musicPaths: string[] = [
    "Clair de Lune (Studio Version).mp3",
    "Interstellar Main Theme - Extra Extended.mp3",
    "pov_ you are studying with some classical music in an ancient academy [STUDY MUSIC].mp3",
    "Joe Hisaishi - Merry-Go-Round of Life (from Howls Moving Castle).mp3",
    "Studying with poets long gone - A DARK ACADEMIA PLAYLIST (classical).mp3",
    "peace.mp3"
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleBackgroundChange = () => {
    const nextIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    setCurrentVideoIndex(nextIndex);
  };

  useEffect(() => {
    const video = document.getElementById(
      "background-video"
    ) as HTMLVideoElement;
    video.src = backgroundVideos[currentVideoIndex];
  }, [currentVideoIndex, backgroundVideos]);

  return (
    <MusicPlayerProvider>
      <div className="absolute top-0 left-0 w-full h-full bg-black overflow-hidden">
        <video
          id="background-video"
          className="absolute bottom-0 left-0 min-w-full min-h-full object-cover transition-all ease-in"
          autoPlay
          muted
          loop
        >
          <source src={backgroundVideos[currentVideoIndex]} type="video/mp4" />
        </video>
      </div>
      <Navbar />
      <Sounds />
      <MusicPlayer musicPaths={musicPaths} onBackgroundChange={handleBackgroundChange} />
    </MusicPlayerProvider>
  );
}

export default App;

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/imkpandey/Nirvan.git
// git push -u origin main