import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Sounds from "./components/Sounds";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import "./App.css";

function App() {
  const backgroundVideos: string[] = [
    "https://drive.google.com/uc?id=1ArWDatclvKei7erchkkKVULOMtBlDrbd",
    "https://drive.google.com/uc?id=1hQJq-6OVWKxh_k4e9yktYDq-kCMt6htH",
    "https://drive.google.com/uc?id=1o74Cju7-bzAw2XKgyeJ52unyVwYbbTnJ",
    "https://drive.google.com/uc?id=1sgrCwccRsxC66b1s0NZweJOYQv6N5aXK",
    "https://drive.google.com/uc?id=1Gis1E_2AcZZ9zCgmnTsWoGCwY79S1a8k",
    "https://drive.google.com/uc?id=1YGApOobJeB3ySSpd9bEWiJmR1gYQ4DmY",
    "https://drive.google.com/uc?id=10oCW52CHnPvivdbyN1Qt69eSMvEp31md",
    "https://drive.google.com/uc?id=1R-OxB9c99VmN4svqh9GY6BpLEMeqV6KK",
    "https://drive.google.com/uc?id=1AmZxGnxwmXwrrroKZ-U3qK9QLAcUANEW",
    "https://drive.google.com/uc?id=19q30mGweRYgJ1sKGPSsCxiv4aC6PmA1C",
    "https://drive.google.com/uc?id=1z5w_XQnH_MLtGtcUIHfHcSxvynudpIqV",
  ];

  const musicPaths = [
    {
      path: "https://drive.google.com/uc?id=12tAtigcAp8M0D5veI40L9_P9KBcs1oHp",
      title: "Claire De Lune (Studio Version)",
    },
    {
      path: "https://drive.google.com/uc?id=1OXIrtaI4_LPmwMgQnfwbjVWepVhsmOjn",
      title: "Interstellar Main Theme - Extra Extended",
    },
    {
      path: "https://drive.google.com/uc?id=1BxzDU0-c7zOi25yH0EQGT7uz0NGNanOV",
      title: "Joe Hisaishi - Merry-Go-Round of Life (Howl's Moving Castle)",
    },
    {
      path: "https://drive.google.com/uc?id=18OxJxrO4hChclYvEundvu5T4u918YeVt",
      title: "Peace",
    },
    {
      path:
        "https://drive.google.com/uc?id=1CDxEmlLuHI5ABtC1IZZfoutjW-KVk5Fo",
      title: "POV_you are studying with some classical music in an ancient academy",
    },
    {
      path: "https://drive.google.com/uc?id=1UdL6IAEullhxee7L1nJqEjtsadUCTGsg",
      title: "Studying with poets long gone - A DARK ACADEMIA PLAYLIST (classical)",
    },
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
          preload="auto"
          autoPlay
          muted
          loop
        >
          <source src={backgroundVideos[currentVideoIndex]} type="video/mp4" />
        </video>
      </div>
      <Navbar />
      <Sounds />
      <MusicPlayer musicPaths={musicPaths.map((music) => music.path)}
        musicTitles={musicPaths.map((music) => music.title)}
        onBackgroundChange={handleBackgroundChange} />
    </MusicPlayerProvider>
  );
}

export default App;
