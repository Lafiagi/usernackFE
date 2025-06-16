import React, { useState } from "react";

const OrderForm = ({ onSubmit, loading, error, pizza, calculatedPrice }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.customerName.trim()) {
      errors.customerName = "Name is required";
    }

    if (!formData.customerAddress.trim()) {
      errors.customerAddress = "Address is required";
    }

    if (formData.customerEmail && !isValidEmail(formData.customerEmail)) {
      errors.customerEmail = "Please enter a valid email address";
    }

    if (formData.customerPhone && !isValidPhone(formData.customerPhone)) {
      errors.customerPhone = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const isFormValid =
    formData.customerName.trim() && formData.customerAddress.trim();

  return (
    <div className="card">
      <h3 style={{ marginBottom: "1rem", color: "#333" }}>
        Customer Information
      </h3>

      {error && (
        <div className="error" style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">
            Full Name <span style={{ color: "#ff6b6b" }}>*</span>
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            style={{
              borderColor: formErrors.customerName ? "#dc3545" : "#ddd",
            }}
          />
          {formErrors.customerName && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {formErrors.customerName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="customerAddress">
            Delivery Address <span style={{ color: "#ff6b6b" }}>*</span>
          </label>
          <textarea
            id="customerAddress"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your complete delivery address"
            rows="3"
            style={{
              borderColor: formErrors.customerAddress ? "#dc3545" : "#ddd",
              resize: "vertical",
            }}
          />
          {formErrors.customerAddress && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {formErrors.customerAddress}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="customerPhone">Phone Number</label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your phone number"
            style={{
              borderColor: formErrors.customerPhone ? "#dc3545" : "#ddd",
            }}
          />
          {formErrors.customerPhone && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {formErrors.customerPhone}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="customerEmail">Email Address</label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email address"
            style={{
              borderColor: formErrors.customerEmail ? "#dc3545" : "#ddd",
            }}
          />
          {formErrors.customerEmail && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {formErrors.customerEmail}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Special Instructions</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
            placeholder="Any special instructions for your order..."
            rows="2"
            style={{ resize: "vertical" }}
          />
        </div>

        <div
          style={{
            background: "#f8f9fa",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <div style={{ fontSize: "0.9rem", color: "#666" }}>
            <strong>Order Summary:</strong>
            <br />
            {pizza?.name} × {calculatedPrice?.quantity || 1}
            <br />
            {calculatedPrice && (
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#ff6b6b",
                }}
              >
                Total: ${calculatedPrice.total_price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={!isFormValid || loading}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <div
          style={{
            fontSize: "0.875rem",
            color: "#666",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          <span style={{ color: "#ff6b6b" }}>*</span> Required fields
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
