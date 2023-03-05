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
  temporizador,
}) {
  const levelSelected = MINESWEEPER_LEVELS[difficult];
  const rows = levelSelected.rows;
  const cols = levelSelected.cols;
  const mines = levelSelected.mines;

  const [minePositions, setMinePositions] = useState([]);
  const [remainingMines, setRemainingMines] = useState(mines);

  const [firstClick, setFirstClick] = useState(false);

  function generateMinePositions(excludedPosition) {
    const positions = [];
    while (positions.length < mines) {
      const randomPosition = Math.floor(Math.random() * (rows * cols));
      if (
        randomPosition !== excludedPosition &&
        !positions.includes(randomPosition)
      ) {
        positions.push(randomPosition);
      }
    }
    setMinePositions(positions);
  }

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
          temporizador={temporizador}
          gameWon={gameWon}
          gameOver={gameOver}
          onGameStart={handleGameStart}
          handleRemainingMines={handleRemainingMines}
          cellIndex={cellIndex}
          firstClick={firstClick}
          setFirstClick={setFirstClick}
          generateMinePositions={generateMinePositions}
          analyzeWon={analyzeWon}
        />
      );
    }
    table.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

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

  function handleRemainingMines(prop) {
    setRemainingMines(remainingMines + prop);
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
