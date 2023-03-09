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

  useEffect(() => {
    if (gameWon) timer("won");
    if (gameWon || gameOver) setIsRevealed(true);
  }, [gameWon, timer, gameOver]);

  const handleCellClick = () => {
    if (gameWon || gameOver || isRevealed) {
      return;
    }

    const cellExcluded = getNeighboringCells(cellIndex);

    if (hasMine) {
      timer("stop");
      onGameOver();
    } else {
      if (!firstClick) {
        generateMinePositions(cellExcluded);
        setFirstClick(true);
      }
      onGameStart();
      setIsRevealed(true);
      timer("start");

      if (nearbyMines === 0) {
        cellExcluded.shift();

        cellExcluded.forEach((cell) => {
          const cellComponent = document.getElementById(`cell-${cell}`);
          if (cellComponent && !cellComponent.classList.contains("revealed")) {
            handleAutoReveal(cell);
          }
        });
      }

      analyzeWon();
    }
  };

  function handleAutoReveal(cell) {
    const cellComponent = document.getElementById(`cell-${cell}`);
    cellComponent.click();
  }

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
        return (
          <span style={numberStyles[nearbyMines]} className={`cell revealed`}>
            {nearbyMines}
          </span>
        );
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
