import React from "react";
import "../styles/rankingscores.css";
import { formatearTiempo } from "../utilities/functions";

const RankingScores = ({ scores }) => {
  let dateOfDay = new Date();
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  let formattedDate = dateOfDay.toLocaleDateString("es-ES", options);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={index}>
            <td> {index + 1} </td>
            <td>{formatearTiempo(score.time)}</td>
            <td>{formattedDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingScores;
