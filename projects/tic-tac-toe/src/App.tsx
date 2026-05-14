import * as React from 'react';
import Board from './components/Board';

const App = () => {
  const [startGame, setStartGame] = React.useState<boolean>(false);
  return (
    <div className="flex justify-center items-center flex-col gap-3 min-h-screen p-6 bg-linear-to-b from-blue-900 to-black">
      <div className="bg-linear-to-t from-blue-900 to-black text-white rounded-3xl shadow-2xl w-full max-w-md p-10">
        <h1 className="text-5xl font-bold text-center mb-10 text-white">
          Tic Tac Toe
        </h1>
        {startGame ? (
          <Board setStartGame={setStartGame} />
        ) : (
          <div className="flex justify-center items-center mb-10">
            <button
              className="bg-white text-black text-2xl font-bold px-5 py-3 rounded-2xl hover:cursor-pointer active:scale-95"
              onClick={() => setStartGame((prev) => !prev)}
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
