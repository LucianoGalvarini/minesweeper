import { useState } from "react";
import "./App.css";
import Table from "./components/Table";

function App() {
  const levels = ["easy", "medium", "hard"];
  const [difficult, setDifficult] = useState("");
  const [tableKey, setTableKey] = useState(0);

  function difficultSelected(difficult) {
    setDifficult(difficult);
    setTableKey(tableKey + 1);
  }

  return (
    <div className="app">
      <h1>MINESWEEPER</h1>
      <div className="options">
        <div className="buttons">
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
        {(difficult !== "" && (
          <p>
            Difficult: <strong>{difficult}</strong>
          </p>
        )) || (
          <p>
            Difficult: <strong>unselected</strong>
          </p>
        )}
      </div>
      {difficult !== "" && <Table difficult={difficult} key={tableKey} />}
    </div>
  );
}

export default App;
