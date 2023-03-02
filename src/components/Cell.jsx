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
        const numberStyles = {
          1: { color: "#0000FF" },
          2: { color: "#008000" },
          3: { color: "#FF0000" },
          4: { color: "#800080" },
          5: { color: "#8B0000" },
          6: { color: "#008080" },
          7: { color: "#000000" },
          8: { color: "#808080" },
        };
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
