import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./pages/Registration";
import Vehicles from "./pages/Vehicles";
import Vehicle from "./pages/Vehicle";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/vehicles" replace />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:id" element={<Vehicle />} />
      </Routes>
    </BrowserRouter>
  );
}