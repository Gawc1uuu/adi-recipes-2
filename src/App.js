import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboad/Dashboard";
import CreateRecipe from "./pages/createrecipe/CreateRecipe";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Recipe from "./pages/recipe/Recipe";
//styles
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
