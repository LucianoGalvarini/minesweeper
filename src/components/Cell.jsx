import { useState, useEffect } from "react";
import "../styles/cell.css";
import { numberStyles } from "../utilities/constants";

export default function Cell({
  hasMine,
  nearbyMines,
  onGameOver,
  timer,
  gameWon,
  gameOver,
  onGameStart,
  handleRemainingMines,
  cellIndex,
  firstClick,
  setFirstClick,
  generateMinePositions,
  analyzeWon,
  getNeighboringCells,
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const cellExcluded = getNeighboringCells(cellIndex);

  useEffect(() => {
    if (gameWon) timer("won");
    if (gameWon || gameOver) setIsRevealed(true);
  }, [gameWon, timer, gameOver]);

  const handleCellClick = () => {
    if (gameWon || gameOver || isRevealed || isFlagged) {
      return;
    }

    if (hasMine) {
      timer("stop");
      onGameOver();
    } else {
      if (!firstClick) {
        generateMinePositions(cellExcluded.map((cell) => cell.index));
        setFirstClick(true);
      }
      timer("start");
    }

    onGameStart();
    setIsRevealed(true);
    analyzeWon();
  };

  const handleCellRightClick = (e) => {
    e.preventDefault();
    if (!isRevealed) {
      setIsFlagged(!isFlagged);
      timer("start");
      if (!isFlagged) {
        handleRemainingMines(-1);
      } else {
        handleRemainingMines(1);
      }
    }
  };

  const renderContent = () => {
    if (isRevealed || gameWon || gameOver) {
      if (hasMine) {
        return "💣";
      } else if (nearbyMines > 0) {
        return <span style={numberStyles[nearbyMines]}>{nearbyMines}</span>;
      }
    } else if (isFlagged) {
      return "🚩";
    }
    return null;
  };

  return (
    <div
      className={`cell ${isRevealed ? "revealed" : ""}`}
      onClick={handleCellClick}
      onContextMenu={handleCellRightClick}
      id={`cell-${cellIndex}`}
    >
      {renderContent()}
    </div>
  );
}
