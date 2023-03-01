import "./App.css";
import Table from "./components/Table";

function App() {
  const difficult = "hard";
  return (
    <div className="App">
      <Table difficult={difficult} />
    </div>
  );
}

export default App;
