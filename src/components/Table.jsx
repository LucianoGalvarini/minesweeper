import React from "react";
import Cell from "./Cell";
import "../styles/table.css";
import { MINESWEEPER_LEVELS } from "../utilities/constants";

export default function Table({ difficult, key }) {
  const levelSelected = MINESWEEPER_LEVELS[difficult];
  const rows = levelSelected.rows;
  const cols = levelSelected.cols;
  const mines = levelSelected.mines;

  const generateMinePositions = () => {
    const positions = [];
    while (positions.length < mines) {
      const randomPosition = Math.floor(Math.random() * (rows * cols));
      if (!positions.includes(randomPosition)) {
        positions.push(randomPosition);
      }
    }
    return positions;
  };

  const handleGameOver = () => {
    console.log("Game Over");
    // setTimeout(() => {
    //   window.location.reload("/");
    // }, 1500);
  };

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
  const minePositions = generateMinePositions();

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
    <div className="table" key={key}>
      {table}
    </div>
  );
}
