import { useState, useEffect } from "react";
import { Timer1, Maximize2 } from "iconsax-react";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 30000);
  }, []);

  const handleFullScreen = (e: any) => {
    e.preventDefault();

    if (!fullscreen) {
      setFullscreen(true);
      document.documentElement.requestFullscreen();
    } else {
      setFullscreen(false);

      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-between pl-10 pr-4 text-white">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-12" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div className="flex items-center space-x-2">
        <div className="bg-black opacity-90 text-white p-2 rounded-lg hover:opacity-100">
          <h1 className="text-xl">
            {time.getHours()}:
            {time.getMinutes() < 10
              ? "0" + time.getMinutes()
              : time.getMinutes()}
          </h1>
        </div>
        <div
          className="p-2 bg-black opacity-80 rounded-lg hover:opacity-90 md:tooltip md:tooltip-bottom"
          data-tip="Pomodoro Timer"
        >
          <Timer1 size={18} color="white" className="cursor-pointer" />
        </div>
        <div
          className="p-2 bg-black opacity-80 rounded-lg hover:opacity-90 md:tooltip md:tooltip-bottom"
          data-tip="Fullscreen"
          onClick={handleFullScreen}
        >
          <Maximize2 size={18} color="white" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
