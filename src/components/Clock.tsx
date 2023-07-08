import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 30000);
  }, []);

  return (
    <div className="flex space-y-6 justify-center items-center h-screen">
      <div className="bg-black opacity-70 text-white p-12 rounded-xl hover:opacity-80">
        <h1 className="text-9xl">
          {time.getHours()}:
          {time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}
        </h1>
      </div>
    </div>
  );
};

export default Clock;
