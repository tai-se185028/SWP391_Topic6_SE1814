import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./pages/Registration";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}