import React, { useState, useEffect } from 'react';
import './product.scss';
import SearchBar from './SearchBar/SearchBar';
import ProductItem from './ProductItem/ProductItem';
import AddProductModalWindow from './AddProductModalWindow/AddProductModalWindow';
import { Typography } from '@mui/material';

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const searchProducts = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://localhost:9000/products?search=${searchTerm}`);
      console.log(response);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data.products || []); // Accessing the products array from response
    } catch (err) {
      setError('Mahsulotlarni yuklashda xatolik yuz berdi');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load of products
  useEffect(() => {
    searchProducts('');
  }, []);

  return (
    <div className="products">
      <div className="search_bar">
        <SearchBar
         onSearch={searchProducts}
          onOpenModal={handleOpenModal}
          title={"Add Product"}
          />
      </div>

      <div className="product_items">
        <ProductItem
          id={3}
          key={1}
          image_url={require("../../Assets/image.png")} 
          name={"Cantlor"}
          size={"L"}
          price={"120000"}
          unique_number={1}
          colors={"red"}
          count={10}
          />
        {loading && <Typography>Yuklanmoqda...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {products.length === 0 && !loading && !error && (
          <Typography>Mahsulotlar topilmadi</Typography>
        )}
        {products.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            image_url={product.image_url}
            name={product.name}
            size={product.size}
            price={product.price}
            unique_number={product.unique_number}
            colors={product.colors}
            count={product.count}
          />
        ))}
      </div>

      <AddProductModalWindow open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Product;