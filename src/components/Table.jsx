import { useState } from "react";
import Cell from "./Cell";
import "../styles/table.css";
import { MINESWEEPER_LEVELS } from "../utilities/constants";

export default function Table({
  difficult,
  handleGameWon,
  gameWon,
  gameOver,
  handleGameOver,
  handleGameStart,
  timer,
}) {
  const levelSelected = MINESWEEPER_LEVELS[difficult];
  const rows = levelSelected.rows;
  const cols = levelSelected.cols;
  const mines = levelSelected.mines;

  const [minePositions, setMinePositions] = useState([]);
  const [remainingMines, setRemainingMines] = useState(mines);

  const [firstClick, setFirstClick] = useState(false);

  /* ------------------------- Generate mines after the first click ------------------------- */

  function generateMinePositions(excludedPositions) {
    const positions = [];
    while (positions.length < mines) {
      const randomPosition = Math.floor(Math.random() * (rows * cols));
      if (
        !excludedPositions.includes(randomPosition) &&
        !positions.includes(randomPosition)
      ) {
        positions.push(randomPosition);
      }
    }
    setMinePositions(positions);
  }

  function getNeighboringCells(cellIndex) {
    const neighboringCells = [];
    const row = Math.floor(cellIndex / cols);
    const col = cellIndex % cols;

    neighboringCells.push({ index: cellIndex, nearbyMines: 0 });

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const neighborRow = row + i;
        const neighborCol = col + j;
        if (
          neighborRow >= 0 &&
          neighborRow < rows &&
          neighborCol >= 0 &&
          neighborCol < cols
        ) {
          const index = neighborRow * cols + neighborCol;
          const nearbyMines = countNearbyMines(
            neighborRow,
            neighborCol,
            minePositions
          );
          neighboringCells.push({ index, nearbyMines });
        }
      }
    }

    return neighboringCells;
  }

  /* ------------------------- Counts the number of mines around the cell. ------------------------- */

  const countNearbyMines = (i, j, minePositions) => {
    let count = 0;
    for (let row = i - 1; row <= i + 1; row++) {
      for (let col = j - 1; col <= j + 1; col++) {
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
          const index = row * cols + col;
          if (minePositions.includes(index)) {
            count++;
          }
        }
      }
    }
    return count;
  };

  /* ------------------------- Analyzes whether the game has already been won ------------------------- */

  function analyzeWon() {
    let revealedDivCount = 1;

    if (firstClick) {
      const tableDiv = document.getElementById("table");
      const divs = tableDiv.querySelectorAll("div");
      divs.forEach((element) => {
        if (element.classList.contains("revealed")) {
          revealedDivCount++;
        }
      });
    }

    if (revealedDivCount === rows * cols - mines) {
      handleGameWon();
    }
  }

  /* ------------------------- Analyzes the number of mines remaining ------------------------- */

  function handleRemainingMines(prop) {
    setRemainingMines(remainingMines + prop);
  }

  /* ------------------------- /////////////////////////////////////// ------------------------- */

  let table = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const cellIndex = i * cols + j;
      const hasMine = minePositions.includes(cellIndex);
      const nearbyMines = countNearbyMines(i, j, minePositions);
      row.push(
        <Cell
          key={`${i}-${j}`}
          hasMine={hasMine}
          nearbyMines={nearbyMines}
          onGameOver={handleGameOver}
          timer={timer}
          gameWon={gameWon}
          gameOver={gameOver}
          onGameStart={handleGameStart}
          handleRemainingMines={handleRemainingMines}
          cellIndex={cellIndex}
          firstClick={firstClick}
          setFirstClick={setFirstClick}
          generateMinePositions={generateMinePositions}
          analyzeWon={analyzeWon}
          getNeighboringCells={getNeighboringCells}
        />
      );
    }
    table.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return (
    <div>
      <div className="table" id="table">
        {table}
      </div>
      <div>
        <h2>💣 {remainingMines}</h2>
      </div>
    </div>
  );
}
