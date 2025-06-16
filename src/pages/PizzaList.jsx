import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pizzaService } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async (search = "") => {
    try {
      setLoading(true);
      setError(null);

      const data = search
        ? await pizzaService.searchPizzas(search)
        : await pizzaService.getAllPizzas();

      setPizzas(data.results || data);
    } catch (err) {
      console.error("Error fetching pizzas:", err);
      setError("Failed to load pizzas. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchPizzas(term);
  };

  const formatIngredients = (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      return "No ingredients listed";
    }
    return ingredients.map((ingredient) => ingredient.name).join(", ");
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => fetchPizzas(searchTerm)} />
    );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "2rem", color: "#333" }}>
          Our Delicious Pizzas
        </h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      {pizzas.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <h3>No pizzas found</h3>
          <p>
            {searchTerm
              ? `No pizzas match "${searchTerm}". Try a different search term.`
              : "No pizzas are currently available."}
          </p>
          {searchTerm && (
            <button
              className="btn"
              onClick={() => handleSearch("")}
              style={{ marginTop: "1rem" }}
            >
              Show All Pizzas
            </button>
          )}
        </div>
      ) : (
        <div className="grid">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="card">
              <div style={{ marginBottom: "1rem" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                    color: "#333",
                  }}
                >
                  {pizza.name}
                </h3>
                <p className="pizza-price">
                  ${parseFloat(pizza.base_price).toFixed(2)}
                </p>
              </div>

              {pizza.description && (
                <p
                  style={{
                    color: "#666",
                    marginBottom: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  {pizza.description}
                </p>
              )}

              <div className="ingredients">
                <strong>Ingredients:</strong>{" "}
                {formatIngredients(pizza.ingredients)}
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <Link
                  to={`/pizza/${pizza.id}`}
                  className="btn"
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  View Details & Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTerm && pizzas.length > 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            padding: "1rem",
            background: "#e9ecef",
            borderRadius: "8px",
          }}
        >
          <p>
            Showing {pizzas.length} result{pizzas.length !== 1 ? "s" : ""} for "
            {searchTerm}"
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => handleSearch("")}
            style={{ marginTop: "0.5rem" }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default PizzaList;
