import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from '../Product';
import ProductDashboardCard from '../ProductPage/ProductPage';

function ProductRoute() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:id" element={<ProductDashboardCard />} />
      </Routes>
    </Router>
    </>
  );
}

export default ProductRoute;