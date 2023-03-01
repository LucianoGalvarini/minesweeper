import "./App.css";
import Table from "./components/Table";

function App() {
  const difficult = "easy";
  return (
    <div className="App">
      <Table difficult={difficult} />
    </div>
  );
}

export default App;
