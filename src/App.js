import NavigationBar from "./components/navigation-menu";
import { Map } from "./components/map";
import { SubmitApartmentSection } from "./components/submit-apartment-section.jsx";
import { NavigationMenuBack } from "./components/navigation-menu-back.jsx";
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
     <Routes>
       <Route path="/Rent-Out-Application/submit" element={<SubmitHousePage/>}></Route>
       <Route path="/Rent-Out-Application" element={<HomePage/>}></Route>
     </Routes>
   </Router>
   </div>
  );
}

const HomePage = () => {
  return (
      <section>
        <NavigationBar/>
        <Map/>
      </section>

  )
}

const SubmitHousePage = () => {
  return (
    <section>
        <NavigationMenuBack/>
        <SubmitApartmentSection/>
      </section>
  )
}

export default App;
