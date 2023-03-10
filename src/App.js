import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Chronometer from "./components/Chronometer";
import RankingScores from "./components/RankingScores";
import Message from "./components/Message";
import Button from "./components/Button";

function App() {
  const levels = ["Easy", "Medium", "Hard"];
  const [difficult, setDifficult] = useState("");
  const [tableKey, setTableKey] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [temp, setTemp] = useState("");
  const [scores, setScores] = useState([]);

  function handleScores(score) {
    const newScore = { time: score };
    const newScores = [...scores, newScore].sort((a, b) => a.time - b.time);
    setScores(newScores);
  }

  function resetScores() {
    setScores([]);
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

  function timer(props) {
    setTemp(props);
  }

  function handleReset() {
    setGameStart(false);
    setGameWon(false);
    setGameOver(false);
    setTemp("reset");
  }

  return (
    <div className="app">
      <h1>MINESWEEPER</h1>
      <div className="components">
        <div className="options">
          <div className="buttons">
            <p>Choose the difficulty:</p>
            <div>
              {levels.map((level, index) => (
                <Button
                  key={index}
                  level={level}
                  difficultSelected={difficultSelected}
                  handleReset={() => {
                    handleReset();
                  }}
                />
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
                Difficult: <strong>Unselected</strong>
              </p>
            )}
          </div>
          {difficult === "" ? (
            <Message
              msg={`Waiting for you to choose difficulty`}
              styleClass={"chooseDifficulty"}
            />
          ) : !gameStart ? (
            <Message
              msg={`Click on any cell to start playing`}
              styleClass={"startPlaying"}
            />
          ) : (
            <div>
              {gameOver ? (
                <Message
                  msg={"Sorry, you lost this game. Better luck next time!"}
                  styleClass={"gameOver"}
                />
              ) : gameWon ? (
                <Message
                  msg={"Congratulations, you won the game!"}
                  styleClass={"gameWon"}
                />
              ) : (
                <Message msg={"Playing"} styleClass={"playing"} />
              )}
            </div>
          )}

          <Chronometer action={temp} handleScores={handleScores} />

          <div className="scores">
            <h2>Ranking scores</h2>
            <RankingScores scores={scores} />
            {scores.length > 0 && (
              <button onClick={resetScores} className="resetScores">
                Reset scores
              </button>
            )}
          </div>
        </div>

        <div className="divTable">
          {difficult !== "" ? (
            <Table
              key={tableKey}
              difficult={difficult}
              handleGameWon={handleGameWon}
              gameWon={gameWon}
              gameOver={gameOver}
              handleGameStart={handleGameStart}
              handleGameOver={handleGameOver}
              timer={timer}
            />
          ) : (
            <h1>Choose a difficulty</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
