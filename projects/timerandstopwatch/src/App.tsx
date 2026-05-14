import * as React from 'react';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import { RiCheckFill, RiHourglassFill, RiTimerFill } from '@remixicon/react';

const App = () => {
  const [isTimerActive, setIsTimerActive] = React.useState<boolean>(true);
  const [isStopwatchActive, setIsStopwatchActive] =
    React.useState<boolean>(false);
  const [screen, setScreen] = React.useState<string>('timer');

  return (
    <div className="flex justify-center items-center bg-black text-white min-h-screen">
      <div className="bg-linear-to-r from-blue-700 to-blue-800 p-10 rounded-2xl w-full max-w-md">
        <div className="flex justify-around items-center mb-10 gap-5 w-full">
          <div
            className={`flex justify-center items-center ${isTimerActive ? 'bg-white text-blue-700' : 'text-white bg-transparent'} hover:cursor-pointer px-5 py-2 rounded-2xl w-[50%] gap-2`}
          >
            {isTimerActive ? <RiCheckFill /> : <RiHourglassFill />}

            <button
              className="hover:cursor-pointer"
              onClick={() => {
                setScreen('timer');
                setIsTimerActive((prev) => !prev);
                setIsStopwatchActive(false);
              }}
            >
              Timer
            </button>
          </div>
          <div
            className={`flex justify-center items-center ${isStopwatchActive ? 'bg-white text-blue-700' : 'text-white bg-transparent'} hover:cursor-pointer  px-5 py-2 rounded-2xl w-[50%] gap-2`}
          >
            {isStopwatchActive ? <RiCheckFill /> : <RiTimerFill />}

            <button
              className="hover:cursor-pointer"
              onClick={() => {
                setScreen('stopwatch');
                setIsStopwatchActive((prev) => !prev);
                setIsTimerActive(false);
              }}
            >
              Stopwatch
            </button>
          </div>
        </div>
        {screen === 'timer' ? <Timer /> : <Stopwatch />}
      </div>
    </div>
  );
};

export default App;
