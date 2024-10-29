import { SquareStatus } from "./Game";

interface squareProps {
  nextPlayer: SquareStatus;
  currentSquareStatus: SquareStatus;
  onSquareClick: () => void;
}

const Square: React.FC<squareProps> = ({
  nextPlayer,
  currentSquareStatus,
  onSquareClick,
}) => {
  return (
    <div
      className="border border-white/[0.2] w-20 h-20 rounded-md flex justify-center items-center bg-black text-white font-extrabold"
      onClick={onSquareClick}
    >
      <div
        className={`w-full h-full flex justify-center items-center content-center opacity-0 ${
          currentSquareStatus
            ? "opacity-100 text-white"
            : "hover:opacity-100 text-gray-500"
        }`}
      >
        {currentSquareStatus ? currentSquareStatus : nextPlayer}
      </div>
    </div>
  );
};

interface boardProps {
  currentBoardStatus: Array<SquareStatus>;
  onPlay: (nextBoardStatus: Array<SquareStatus>) => void;
  xIsNextPlayer: boolean;
}

const Board: React.FC<boardProps> = ({
  currentBoardStatus,
  onPlay,
  xIsNextPlayer,
}) => {
  const nextPlayer = xIsNextPlayer ? "x" : "o";

  function handleSquareClick(clickedIndex: number) {
    if (currentBoardStatus[clickedIndex] != null) {
      return;
    }
    const nextBoardStatus = currentBoardStatus.slice();
    nextBoardStatus[clickedIndex] = nextPlayer;

    onPlay(nextBoardStatus);
  }
  return (
    <div>
      <div className="border border-white/[0.2] w-auto h-auto rounded-xl p-1 grid grid-cols-3 gap-1 bg-white/20">
        {/* <Square key={0} currentSquareStatus={currentBoardStatus[0]} /> */}
        {currentBoardStatus &&
          currentBoardStatus.map((square, index) => (
            <Square
              key={index}
              nextPlayer={nextPlayer}
              currentSquareStatus={square}
              onSquareClick={() => handleSquareClick(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;
