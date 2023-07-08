import React, { useState, useEffect } from "react";
import { Play, Pause, Refresh } from "iconsax-react";

interface PomodoroTimerProps {
  duration: number;
  onStartPause: () => void;
  onReset: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  duration,
  onStartPause,
  onReset,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout> | null = null;

    if (timerRunning && !timerPaused) {
      intervalId = setTimeout(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearTimeout(intervalId!);
            setTimerRunning(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [timerRunning, timerPaused]);

  const handleStartPause = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      setTimerPaused(false);
    } else {
      setTimerPaused((prevPaused) => !prevPaused);
    }
    onStartPause();
  };

  const handleReset = () => {
    setRemainingTime(duration * 60);
    setTimerRunning(false);
    setTimerPaused(false);
    onReset();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <div className="bg-black opacity-70 text-white p-2 rounded-lg hover:opacity-100">
        <h1 className="text-9xl">{formatTime(remainingTime)}</h1>
      </div>
      <div className="flex space-x-2">
        <div
          className="p-2 bg-black opacity-80 rounded-lg hover:opacity-90"
          onClick={handleStartPause}
        >
          {timerRunning && !timerPaused ? (
            <Pause color="white" fill="white" />
          ) : (
            <Play color="white" fill="white" />
          )}
        </div>
        <div
          className="p-2 bg-black opacity-80 rounded-lg hover:opacity-90"
          onClick={handleReset}
        >
          <Refresh color="white" />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
