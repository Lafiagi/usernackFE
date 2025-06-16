import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pizzaService, extraService, orderService } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import OrderForm from "../components/OrderForm";
import PriceCalculator from "../components/PriceCalculator";

const PizzaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState(null);
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    fetchPizzaAndExtras();
  }, [id]);

  useEffect(() => {
    if (pizza) {
      calculatePrice();
    }
  }, [pizza, selectedExtras, quantity]);

  const fetchPizzaAndExtras = async () => {
    try {
      setLoading(true);
      setError(null);

      const [pizzaData, extrasData] = await Promise.all([
        pizzaService.getPizzaById(id),
        extraService.getAllExtras(),
      ]);

      setPizza(pizzaData);
      setExtras(extrasData.results || extrasData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load pizza details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = async () => {
    if (!pizza) return;

    try {
      const priceData = await pizzaService.calculatePrice(pizza.id, {
        extras: selectedExtras,
        quantity: quantity,
      });
      setCalculatedPrice(priceData);
    } catch (err) {
      console.error("Error calculating price:", err);
      // Fallback calculation if API fails
      const baseTotal = pizza.base_price * quantity;
      const extrasTotal = selectedExtras.reduce((total, extraId) => {
        const extra = extras.find((e) => e.id === extraId);
        return total + (extra ? extra.price * quantity : 0);
      }, 0);

      setCalculatedPrice({
        pizza_id: pizza.id,
        pizza_name: pizza.name,
        base_price: pizza.base_price,
        quantity: quantity,
        extras_ids: selectedExtras,
        total_price: baseTotal + extrasTotal,
      });
    }
  };

  const handleExtraChange = (extraId, isChecked) => {
    if (isChecked) {
      setSelectedExtras([...selectedExtras, extraId]);
    } else {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId));
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleOrderSubmit = async (customerData) => {
    if (!pizza || !calculatedPrice) {
      setOrderError("Unable to place order. Please try again.");
      return;
    }

    try {
      setOrderLoading(true);
      setOrderError(null);

      const orderData = {
        pizza: pizza.id,
        extras: selectedExtras,
        quantity: quantity,
        customer_name: customerData.customerName,
        delivery_address: customerData.customerAddress,
        customer_phone: customerData.customerPhone || "",
        customer_email: customerData.customerEmail || "",
        notes: customerData.notes || "",
      };

      await orderService.createOrder(orderData);

      // Success - redirect to pizza list
      navigate("/", {
        state: {
          message:
            "Order placed successfully! We'll prepare your delicious pizza right away.",
        },
      });
    } catch (err) {
      console.error("Error placing order:", err);

      if (err.response?.data) {
        const errorData = err.response.data;
        if (typeof errorData === "object") {
          const errorMessages = Object.entries(errorData)
            .map(
              ([field, messages]) =>
                `${field}: ${
                  Array.isArray(messages) ? messages.join(", ") : messages
                }`
            )
            .join("; ");
          setOrderError(`Order failed: ${errorMessages}`);
        } else {
          setOrderError(`Order failed: ${errorData}`);
        }
      } else {
        setOrderError(
          "Failed to place order. Please check your information and try again."
        );
      }
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message={error} onRetry={fetchPizzaAndExtras} />;
  if (!pizza) return <ErrorMessage message="Pizza not found" />;

  const formatIngredients = (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      return "No ingredients listed";
    }
    return ingredients.map((ingredient) => ingredient.name).join(", ");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        alignItems: "start",
      }}
    >
      {/* Pizza Details */}
      <div>
        <div className="card">
          <h1
            style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}
          >
            {pizza.name}
          </h1>

          <div className="pizza-price" style={{ marginBottom: "1rem" }}>
            Base Price: ${parseFloat(pizza.base_price).toFixed(2)}
          </div>

          {pizza.description && (
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                color: "#666",
                marginBottom: "1.5rem",
              }}
            >
              {pizza.description}
            </p>
          )}

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>
              Ingredients:
            </h3>
            <p className="ingredients" style={{ fontSize: "1rem" }}>
              {formatIngredients(pizza.ingredients)}
            </p>
          </div>

          {pizza.nutritional_info && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>
                Nutritional Info:
              </h3>
              <p style={{ color: "#666" }}>{pizza.nutritional_info}</p>
            </div>
          )}
        </div>

        {/* Extras Selection */}
        {extras.length > 0 && (
          <div className="card">
            <h3 style={{ marginBottom: "1rem", color: "#333" }}>Add Extras</h3>
            <div>
              {extras.map((extra) => (
                <div key={extra.id} className="extra-item">
                  <input
                    type="checkbox"
                    id={`extra-${extra.id}`}
                    checked={selectedExtras.includes(extra.id)}
                    onChange={(e) =>
                      handleExtraChange(extra.id, e.target.checked)
                    }
                  />
                  <label
                    htmlFor={`extra-${extra.id}`}
                    style={{ flex: 1, cursor: "pointer" }}
                  >
                    <span style={{ fontWeight: "600" }}>{extra.name}</span>
                    {extra.description && (
                      <span
                        style={{
                          color: "#666",
                          fontSize: "0.9rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        - {extra.description}
                      </span>
                    )}
                    <span
                      style={{
                        color: "#ff6b6b",
                        fontWeight: "600",
                        marginLeft: "0.5rem",
                      }}
                    >
                      +${parseFloat(extra.price).toFixed(2)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Form */}
      <div>
        <PriceCalculator
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          calculatedPrice={calculatedPrice}
          selectedExtras={selectedExtras}
          extras={extras}
        />

        <OrderForm
          onSubmit={handleOrderSubmit}
          loading={orderLoading}
          error={orderError}
          pizza={pizza}
          calculatedPrice={calculatedPrice}
        />
      </div>
    </div>
  );
};

export default PizzaDetail;
