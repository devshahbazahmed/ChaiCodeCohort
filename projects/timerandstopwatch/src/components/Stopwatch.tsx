import { RiLoopLeftFill, RiPauseLargeFill, RiPlayFill } from '@remixicon/react';
import * as React from 'react';

const Stopwatch = () => {
  const [time, setTime] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  const intervalRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handelPause = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-7xl font-extrabold mb-10">{formatTime()}</h1>
      {isRunning ? (
        <div className="flex justify-center items-center gap-5 w-full">
          <button
            className="bg-white text-blue-700 w-[50%] flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
            onClick={handelPause}
          >
            <RiPauseLargeFill className="font-extrabold" />
          </button>
          <button
            className="bg-white text-blue-700 w-[50%] flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
            onClick={handleReset}
          >
            <RiLoopLeftFill />
          </button>
        </div>
      ) : (
        <button
          className="bg-white text-blue-700 w-full flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
          onClick={handleStart}
        >
          <RiPlayFill />
        </button>
      )}
    </div>
  );
};

export default Stopwatch;
