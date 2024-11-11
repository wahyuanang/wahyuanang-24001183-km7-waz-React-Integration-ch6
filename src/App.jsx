import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import NavbarTailwind from "./components/navbar/NavbarTailwind";
import "./App.css";

import HomeView from "./pages/HomeView";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <NavbarTailwind />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
