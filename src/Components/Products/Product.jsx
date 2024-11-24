import React, { useState } from 'react';
import './product.scss';
import SearchBar from './SearchBar/SearchBar';
import ProductItem from './ProductItem/ProductItem';
import AddProductModalWindow from './AddProductModalWindow/AddProductModalWindow';

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="products">
      {/* SearchBar modalni ochish funksiyasini oladi */}
      <div className="search_bar">
        <SearchBar onOpenModal={handleOpenModal} />
      </div>
      <div className="product_items">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />

        {/* AddProductModalWindow modalni boshqaradi */}
        <AddProductModalWindow open={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Product;
