import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>🍕 User Snack</h1>
          <nav className="nav">
            <Link
              to="/"
              style={{
                backgroundColor:
                  location.pathname === "/"
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
              }}
            >
              All Pizzas
            </Link>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">{children}</div>
      </main>

      <footer
        style={{
          background: "#333",
          color: "white",
          textAlign: "center",
          padding: "1rem",
          marginTop: "2rem",
        }}
      >
        <div className="container">
          <p>&copy; 2025 Pizza Palace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
