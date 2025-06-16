import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#ff6b6b" }}>
        404
      </h1>
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>Page Not Found</h2>
      <p style={{ color: "#666", marginBottom: "2rem", fontSize: "1.1rem" }}>
        Oops! The page you're looking for doesn't exist. Maybe it got eaten like
        a delicious pizza? 🍕
      </p>
      <Link to="/" className="btn" style={{ textDecoration: "none" }}>
        Back to Pizza Menu
      </Link>
    </div>
  );
};

export default NotFound;
