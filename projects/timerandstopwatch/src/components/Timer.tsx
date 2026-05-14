import * as React from 'react';
import { RiLoopLeftFill, RiPauseLargeFill, RiPlayFill } from '@remixicon/react';

const Timer = () => {
  const [inputMinutes, setInputMinutes] = React.useState('');
  const [inputSeconds, setInputSeconds] = React.useState('');

  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  const intervalRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);

      if (isRunning) {
        alert("Time's up");
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    const totalTime = Number(inputMinutes) * 60 + Number(inputSeconds);

    if (!isRunning && totalTime > 0) {
      setTimeLeft(totalTime);
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleResume = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);

    setIsRunning(false);
    setTimeLeft(0);

    setInputMinutes('');
    setInputSeconds('');
  };

  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  return (
    <div className="flex justify-center items-center gap-3 flex-col">
      {!isRunning && timeLeft === 0 && (
        <div className="w-full mb-8">
          <input
            type="number"
            className="border-none outline-none text-center text-2xl w-[50%]"
            placeholder="Minutes"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
          />
          <input
            type="number"
            className="border-none outline-none text-center text-2xl w-[50%]"
            placeholder="Seconds"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(e.target.value)}
          />
        </div>
      )}
      <h1 className="text-center text-7xl font-extrabold mb-10">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
      <div className="w-full">
        {!isRunning && timeLeft === 0 && (
          <button
            className="bg-white text-blue-700 w-full flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
            onClick={handleStart}
          >
            <RiPlayFill />
          </button>
        )}

        {isRunning && timeLeft > 0 && (
          <div className="flex justify-center items-center gap-5 w-full">
            <button
              className="bg-white text-blue-700 w-full flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
              onClick={handlePause}
            >
              <RiPauseLargeFill />
            </button>
            <button
              className="bg-white text-blue-700 w-full flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
              onClick={handleReset}
            >
              <RiLoopLeftFill />
            </button>
          </div>
        )}

        {!isRunning && timeLeft > 0 && (
          <div className="flex justify-center items-center gap-5 w-full">
            <button
              className="bg-white text-blue-700 w-full flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
              onClick={handleResume}
            >
              <RiPlayFill />
            </button>
            <button
              className="bg-white text-blue-700 w-full flex justify-center items-center text-center rounded-2xl hover:cursor-pointer active:scale-95 px-5 py-2"
              onClick={handleReset}
            >
              <RiLoopLeftFill />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
