import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboad/Dashboard";
import CreateRecipe from "./pages/createrecipe/CreateRecipe";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Recipe from "./pages/recipe/Recipe";
import { useAuthContext } from "./hooks/useAuthContext";
//styles
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route
              path="/create"
              element={user ? <CreateRecipe /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
