import axios from "axios";

const API_BASE_URL = "http://localhost:8000/usersnack/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    if (error.response) {
      const { status, data } = error.response;
      console.error(`HTTP ${status}:`, data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export const pizzaService = {
  // Get all pizzas
  getAllPizzas: async (params = {}) => {
    const response = await api.get("/pizza/", { params });
    return response.data;
  },

  // Get single pizza by ID
  getPizzaById: async (id) => {
    const response = await api.get(`/pizza/${id}/`);
    return response.data;
  },

  // Calculate pizza price with extras
  calculatePrice: async (pizzaId, data) => {
    const response = await api.post(`/pizza/${pizzaId}/calculate_price/`, data);
    return response.data;
  },

  // Search pizzas
  searchPizzas: async (searchTerm) => {
    const response = await api.get("/pizza/", {
      params: { search: searchTerm },
    });
    return response.data;
  },
};

export const extraService = {
  // Get all available extras
  getAllExtras: async () => {
    const response = await api.get("/extra/");
    return response.data;
  },
};

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post("/order/", orderData);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/order/${id}/`);
    return response.data;
  },

  // Get all orders
  getAllOrders: async () => {
    const response = await api.get("/order/");
    return response.data;
  },
};

export default api;
