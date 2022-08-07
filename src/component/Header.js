import React from "react";
import logo from "../image/logo.png";
export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <img src={logo} alt="logo" />
        <h2>MemesGenerator</h2>
      </nav>
    </header>
  );
}
