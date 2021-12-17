import NavigationBar from "./components/navigation-menu";
import { Map } from "./components/map";
import "./styles/index.css"

function App() {
  return (
    <div className="main-container">
      <NavigationBar/>
      <Map/>
    </div>
  );
}

export default App;
