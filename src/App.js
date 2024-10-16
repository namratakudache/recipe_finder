import "./App.css";
import Navbar from "./Components/Common/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./Pages/Recipes";
import RecipeDetails from "./Components/Common/RecipeDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
