import "./App.css";
import K12Table from "./components/K12Table/K12Table";
import K11Table from "./components/K11Table/K11Table";
import Divider from "@material-ui/core/Divider";

function App() {
  return (
    <div className="App">
      <K12Table />
      <Divider />
      <K11Table />
      <p>Created by Evyatar Sivan &#169;</p>
    </div>
  );
}

export default App;
