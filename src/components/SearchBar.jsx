import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
    >
      <input
        type="text"
        placeholder="Search pizzas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
        style={{ flex: 1 }}
      />
      <button type="submit" className="btn">
        Search
      </button>
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-secondary"
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;
