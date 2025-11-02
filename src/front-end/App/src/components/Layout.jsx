import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children, showNavbar = true }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar username="Username" />}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
