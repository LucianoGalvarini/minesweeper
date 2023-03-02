import React from "react";
import "../styles/rankingscores.css";
import { formatearTiempo } from "../utilities/functions";

const RankingScores = ({ scores }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={index}>
            <td> {index + 1} </td>
            <td>{formatearTiempo(score.time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingScores;
