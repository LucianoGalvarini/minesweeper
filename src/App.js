import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Chronometer from "./components/Chronometer";
import RankingScores from "./components/RankingScores";

function App() {
  const levels = ["easy", "medium", "hard"];
  const [difficult, setDifficult] = useState("");
  const [tableKey, setTableKey] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [temp, setTemp] = useState("");

  const scores = [
    {
      time: 1241,
    },
  ];

  function handleScores(score) {
    scores.push(score);
  }

  function difficultSelected(difficult) {
    setDifficult(difficult);
    setTableKey(tableKey + 1);
  }

  function handleGameWon() {
    setGameWon(true);
  }

  function handleGameOver() {
    setGameOver(true);
  }

  function handleGameStart() {
    setGameStart(true);
  }

  function temporizador(props) {
    setTemp(props);
  }

  return (
    <div className="app">
      <h1>MINESWEEPER</h1>
      <div className="components">
        <div className="options">
          <div className="buttons">
            <p>Choose the difficulty:</p>
            <div>
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    difficultSelected(level);
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="difficult">
            {difficult !== "" ? (
              <p>
                Difficult: <strong>{difficult}</strong>
              </p>
            ) : (
              <p>
                Difficult: <strong>unselected</strong>
              </p>
            )}
          </div>
          {!gameStart ? (
            <h3 className="startPlaying">
              Click on any cell
              <br />
              to start playing
            </h3>
          ) : (
            <div>
              {gameOver ? (
                <h2 className="gameOver">GAME OVER</h2>
              ) : gameWon ? (
                <h2 className="gameWon">YOU WIN!</h2>
              ) : (
                <h2 className="playing">PLAYING</h2>
              )}
            </div>
          )}

          <Chronometer action={temp} />

          <div className="scores">
            <h2>Ranking scores</h2>
            <RankingScores scores={scores} />
          </div>
        </div>

        {difficult !== "" && (
          <Table
            difficult={difficult}
            key={tableKey}
            handleGameWon={handleGameWon}
            handleGameStart={handleGameStart}
            handleGameOver={handleGameOver}
            temporizador={temporizador}
            handleScores={handleScores}
          />
        )}
      </div>
    </div>
  );
}

export default App;
