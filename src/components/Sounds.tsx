import { Setting4 } from "iconsax-react";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const soundList = [
  {
    path: "sound/effects/audio--rain.mp3",
    title: "Rain",
  },
  {
    path: "sound/effects/audio--campfire.mp3",
    title: "Campfire",
  },
  {
    path: "sound/effects/audio--waves.mp3",
    title: "Waves",
  },
  {
    path: "sound/effects/audio--birds.mp3",
    title: "Birds",
  },
  {
    path: "sound/effects/audio--city.mp3",
    title: "City",
  },
  {
    path: "sound/effects/audio--keyboard.mp3",
    title: "Keyboard",
  },
  {
    path: "sound/effects/audio--storm.mp3",
    title: "Storm",
  },
  {
    path: "sound/effects/audio--wind.mp3",
    title: "Wind",
  },
];

const Sounds = () => {
  const [volume, setVolume] = useState<number[]>([0]);

  const handleSliderChange = (index: number, value: number) => {
    const newVolume = [...volume];
    newVolume[index] = value;
    setVolume(newVolume);
    localStorage.setItem("soundVolume", JSON.stringify(newVolume));
  };

  return (
    <div className="absolute right-0 bottom-1/2 p-4 dropdown dropdown-center dropdown-left">
      <div
        tabIndex={0}
        className="p-2 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-90 md:tooltip md:tooltip-left"
        data-tip="Sound Effects"
      >
        <Setting4 size={18} color="white" className="cursor-pointer" />
      </div>
      <div
        tabIndex={0}
        className="dropdown-content block z-[1] menu p-4 bg-black bg-opacity-80 text-white rounded-box space-y-4 w-52 max-h-56 overflow-y-scroll"
      >
        <p className="font-semibold">Sound Effects</p>
        {soundList.map((sound, index) => (
          <div key={sound.title}>
            <p>{sound.title}</p>
            <input
              type="range"
              min={0}
              max={100}
              value={volume[index] || 0}
              className="ml-1 my-1 range range-xs"
              onChange={(e) =>
                handleSliderChange(index, parseInt(e.target.value))
              }
            />
            {volume[index] > 0 && (
              <ReactAudioPlayer
                src={sound.path}
                volume={(volume[index] || 0) / 100}
                autoPlay={true}
                loop={true}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sounds;
