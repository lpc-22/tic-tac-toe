"use client";

import { useEffect, useState } from "react";
import Board from "./Board";

export type SquareStatus = null | "x" | "o";

const Game: React.FC = () => {
  const [histroy, setHistory] = useState([Array<SquareStatus>(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNextPlayer = currentMove % 2 === 0;
  const currentBoard = histroy[currentMove];

  function handlePlay(nextBoardStatus: Array<SquareStatus>) {
    const nextHistory = [...histroy.slice(0, currentMove + 1), nextBoardStatus];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    calculateWinner(nextBoardStatus);
  }

  function handleJump(selectedMove: number) {
    setCurrentMove(selectedMove);
  }

  function calculateWinner(currentBoard: Array<SquareStatus>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(currentBoard);

  useEffect(() => {}, [currentMove, currentBoard]);

  return (
    <div className="bg-black border border-white/[0.2] w-auto h-auto rounded-xl p-6 flex flex-col gap-2 font-mono">
      <div className="flex justify-between">
        {winner ? (
          <>
            <p>The winner is: {winner}</p>
            <button className="underline underline-offset-4">reset</button>
          </>
        ) : (
          <p className="">The next player is: {xIsNextPlayer ? "x" : "o"}</p>
        )}
      </div>
      <div className="flex flex-row gap-4">
        <Board
          currentBoardStatus={currentBoard}
          onPlay={winner ? () => {} : handlePlay}
          xIsNextPlayer={xIsNextPlayer}
        />
        <GameInfo histroy={histroy} handleJump={handleJump} />
      </div>
    </div>
  );
};

const GameInfo = ({
  histroy,
  handleJump,
}: {
  histroy: Array<Array<SquareStatus>>;
  handleJump: (selectedMove: number) => void;
}) => {
  const moves = histroy.map((move, index) => {
    let description;
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={index}>
        <button className="hover:underline" onClick={() => handleJump(index)}>
          {description}
        </button>
      </li>
    );
  });
  return (
    <div className="w-60">
      <ol className="list-inside">{moves}</ol>
    </div>
  );
};

export default Game;
