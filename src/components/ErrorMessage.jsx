import React from "react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error" style={{ textAlign: "center" }}>
      <h3 style={{ marginBottom: "1rem" }}>Something went wrong</h3>
      <p style={{ marginBottom: "1rem" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn"
          style={{ background: "#dc3545" }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
