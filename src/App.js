import NavigationBar from "./components/navigation-menu";
import { Map } from "./components/map";
import { SubmitApartmentPage} from "./components/submit-apartment-page"
import "./styles/index.css"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="main-container">
     <Router>
     <NavigationBar/>
     <Routes>
       <Route path="/" element={<Map/>}></Route>
       <Route path="/submit" element={<SubmitApartmentPage/>}></Route>
     </Routes>
   </Router>
   </div>
  );
}

export default App;
