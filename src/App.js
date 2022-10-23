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
import Edit from "./pages/editpage/Edit";
import Footer from "./components/Footer";
import Search from "./pages/search/Search";
import ThemeChange from "./components/ThemeChange";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { mode } = useContext(ThemeContext);
  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <ThemeChange />
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
            <Route
              path="/recipes/:id/edit"
              element={user ? <Edit /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={user ? <Search /> : <Navigate to="/" />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
