import React from "react";

const PriceCalculator = ({
  quantity,
  onQuantityChange,
  calculatedPrice,
  selectedExtras,
  extras,
}) => {
  const getSelectedExtrasDetails = () => {
    return selectedExtras
      .map((extraId) => {
        const extra = extras.find((e) => e.id === extraId);
        return extra ? { ...extra, totalPrice: extra.price * quantity } : null;
      })
      .filter(Boolean);
  };

  const selectedExtrasDetails = getSelectedExtrasDetails();

  return (
    <div className="card">
      <h3 style={{ marginBottom: "1rem", color: "#333" }}>
        Customize Your Order
      </h3>

      {/* Quantity Selector */}
      <div className="form-group">
        <label>Quantity:</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="btn btn-secondary"
            style={{
              width: "40px",
              height: "40px",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            -
          </button>
          <span
            style={{
              minWidth: "40px",
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            className="btn btn-secondary"
            style={{
              width: "40px",
              height: "40px",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      {calculatedPrice && (
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="order-item">
            <span>
              {calculatedPrice.pizza_name} × {quantity}
            </span>
            <span>${(calculatedPrice.base_price * quantity).toFixed(2)}</span>
          </div>

          {selectedExtrasDetails.length > 0 && (
            <div>
              <div
                style={{
                  fontWeight: "600",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                  color: "#666",
                }}
              >
                Extras:
              </div>
              {selectedExtrasDetails.map((extra) => (
                <div
                  key={extra.id}
                  className="order-item"
                  style={{ fontSize: "0.9rem" }}
                >
                  <span>
                    {extra.name} × {quantity}
                  </span>
                  <span>${extra.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="order-total">
            <div className="order-item">
              <span>Total:</span>
              <span>${calculatedPrice.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
