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
    if (gameWon || gameOver || isRevealed || isFlagged) {
      return;
    }

    const cellExcluded = getNeighboringCells(cellIndex);

    if (hasMine) {
      timer("stop");
      onGameOver();
    } else {
      if (!firstClick) {
        generateMinePositions(cellExcluded.map((cell) => cell.index));
        setFirstClick(true);
      }
    }

    onGameStart();
    setIsRevealed(true);
    timer("start");
    analyzeWon();

    // if (nearbyMines === 0) {
    //   cellExcluded.forEach((cell) => {
    //     handleCellReveal(cell);
    //   });
    // }
  };

  // const handleCellReveal = (cell) => {
  //   const cellComponent = document.getElementById(`cell-${cell.index}`);
  //   cellComponent.classList.add("revealed");

  //   let numberNearbyMines = cell.nearbyMines;

  //   if (cell.nearbyMines !== 0) {
  //     cellComponent.innerHTML = `
  //     <span id=span-${cell.index}>${numberNearbyMines}</span>
  //     `;

  //     const spanComponent = document.getElementById(`span-${cell.index}`);
  //     Object.assign(spanComponent.style, numberStyles[cell.nearbyMines]);
  //   }
  // };

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
