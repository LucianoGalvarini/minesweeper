import React from "react";
import "../styles/cell.css";

export default function Cell({
  hasMine,
  nearbyMines,
  onGameOver,
  temporizador,
  onGameStart,
}) {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isFlagged, setIsFlagged] = React.useState(false);

  const handleCellClick = () => {
    if (hasMine) {
      temporizador("stop");
      onGameOver();
    } else {
      temporizador("start");
    }
    onGameStart();
    setIsRevealed(true);
  };

  const handleCellRightClick = (e) => {
    e.preventDefault();
    setIsFlagged(!isFlagged);
    temporizador("start");
  };

  const renderContent = () => {
    if (isRevealed) {
      if (hasMine) {
        return "💣";
      } else if (nearbyMines > 0) {
        return nearbyMines;
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
