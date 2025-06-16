import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PizzaList from "./pages/PizzaList";
import PizzaDetail from "./pages/PizzaDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PizzaList />} />
        <Route path="/pizza/:id" element={<PizzaDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
