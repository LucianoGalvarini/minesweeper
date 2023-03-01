import React from "react";
import "../styles/cell.css";

export default function Cell({ hasMine, nearbyMines, onGameOver }) {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isFlagged, setIsFlagged] = React.useState(false);

  const handleCellClick = () => {
    if (hasMine) {
      setIsRevealed(true);
      onGameOver();
    } else {
      setIsRevealed(true);
    }
  };

  const handleCellRightClick = (event) => {
    event.preventDefault();
    setIsFlagged(!isFlagged);
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
      className={`cell ${isRevealed ? "revealed" : ""} ${
        isFlagged ? "flagged" : ""
      }`}
      onClick={handleCellClick}
      onContextMenu={handleCellRightClick}
    >
      {renderContent()}
    </div>
  );
}
