import { useState } from "react";
import "../styles/cell.css";
import { numberStyles } from "../utilities/constants";

export default function Cell({
  hasMine,
  nearbyMines,
  onGameOver,
  temporizador,
  onGameStart,
  handleRemainingMines,
  cellIndex,
  firstClick,
  setFirstClick,
  generateMinePositions,
  analyzeWon,
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleCellClick = () => {
    if (hasMine) {
      temporizador("stop");
      onGameOver();
    } else {
      temporizador("start");
    }
    if (!firstClick) {
      generateMinePositions(cellIndex);
      setFirstClick(true);
    }

    onGameStart();
    setIsRevealed(true);
    analyzeWon();
  };

  const handleCellRightClick = (e) => {
    e.preventDefault();
    if (!isRevealed) {
      setIsFlagged(!isFlagged);
      temporizador("start");
      if (!isFlagged) {
        handleRemainingMines(-1);
      } else {
        handleRemainingMines(1);
      }
    }
  };

  const renderContent = () => {
    if (isRevealed) {
      if (hasMine) {
        return "💣";
      } else if (nearbyMines > 0) {
        return (
          <span
            style={numberStyles[nearbyMines]}
            className={`cell revealed ${nearbyMines}`}
          >
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
    >
      {renderContent()}
    </div>
  );
}
