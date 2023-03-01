import React from "react";
import Cell from "./Cell";
import "../styles/table.css";
import { MINESWEEPER_LEVELS } from "../utilities/constants";

export default function Table({ difficult }) {
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

  const table = [];
  const minePositions = generateMinePositions();

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const cellIndex = i * cols + j;
      const hasMine = minePositions.includes(cellIndex);
      row.push(<Cell key={`${i}-${j}`} hasMine={hasMine} />);
    }
    table.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return <div className="table">{table}</div>;
}
