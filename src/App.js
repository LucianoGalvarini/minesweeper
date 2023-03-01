import { useState } from "react";
import "./App.css";
import Table from "./components/Table";

function App() {
  const levels = ["easy", "medium", "hard"];
  const [difficult, setDifficult] = useState("medium");

  function difficultSelected(difficult) {
    setDifficult(difficult);
  }

  return (
    <div className="app">
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
        <p>
          Difficult: <strong>{difficult}</strong>{" "}
        </p>
      </div>
      <Table difficult={difficult} />
    </div>
  );
}

export default App;
