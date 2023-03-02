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
          4: { color: "#020082" },
          5: { color: "#7c0000" },
          6: { color: "#077984" },
          7: { color: "#a8060c" },
          8: { color: "#ae040f" },
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
