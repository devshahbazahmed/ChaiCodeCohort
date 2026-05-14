import * as React from 'react';

const Board = ({
  setStartGame,
}: {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialBoard = new Array(9).fill(null);
  const [board, setBoard] = React.useState<string[]>(initialBoard);
  const [isXTurn, setIsXTurn] = React.useState<boolean>(true);

  function calculateWinner(board: string[]) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  function handleClick(index: number) {
    if (board[index] || winner) return;
    const updateBoard = [...board];
    updateBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(updateBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(initialBoard);
    setStartGame(false);
    setIsXTurn(true);
  }

  return (
    <>
      <p className="text-center text-3xl font-semibold mb-10">
        {winner
          ? `Winner: ${winner}`
          : isDraw
            ? "It's a draw"
            : `Turn: ${isXTurn ? 'X' : 'O'}`}
      </p>
      <div className="grid grid-cols-3 gap-10">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="aspect-ratio bg-white hover:bg-cyan-700 rounded-2xl w-20 h-20 hover:cursor-pointer p-10 text-center text-black text-4xl font-bold flex justify-center items-center"
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="bg-white text-black text-2xl font-semibold px-5 py-2 w-full rounded-2xl hover:cursor-pointer active:scale-95 mt-10 transition"
      >
        Reset Game
      </button>
    </>
  );
};

export default Board;
