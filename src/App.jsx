import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import NavbarTailwind from "./components/navbar/NavbarTailwind";
import "./App.css";

import HomeView from "./pages/HomeView";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect akan mengecek apakah token ada di local storage atau tidak
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <NavbarTailwind onLogout={handleLogout} />}
      <Routes>
        {/* Jika isAuthenticated true maka akan diarahkan ke HomeView, sebaliknya jika false maka akan diarahkan ke login */}
        <Route path="/" element={isAuthenticated ? <HomeView /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
