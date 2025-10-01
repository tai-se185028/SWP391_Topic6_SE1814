import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegistrationForm from "./pages/Registration";
import Vehicles from "./pages/Vehicles";
import Vehicle from "./pages/Vehicle";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
              <LoginPage apiUrl="https://example.com/api/login" />
            </>
          }
        />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/vehicle" element={< Vehicle />} />
        <Route path="/vehicles/:id" element={<Vehicles />} />
      </Routes>
    </BrowserRouter>
  );
}