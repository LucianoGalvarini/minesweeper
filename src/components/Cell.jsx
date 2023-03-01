import React from "react";
import "../styles/cell.css";

export default function Cell({ hasMine }) {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isFlagged, setIsFlagged] = React.useState(false);

  const handleCellClick = () => {
    setIsRevealed(true);
  };

  const handleCellRightClick = (event) => {
    event.preventDefault();
    setIsFlagged(!isFlagged);
  };

  return (
    <div
      className={`cell ${isRevealed ? "revealed" : ""} ${
        isFlagged ? "flagged" : ""
      }`}
      onClick={handleCellClick}
      onContextMenu={handleCellRightClick}
    >
      {isRevealed && (hasMine ? "💣" : " ")}
    </div>
  );
}
