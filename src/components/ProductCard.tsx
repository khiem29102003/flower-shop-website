'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { useNotification } from './Notification';

// Import motion from framer-motion for animations
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <motion.div 
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative pb-[100%] w-full overflow-hidden rounded-t-lg bg-gray-100">
        <Link href={`/products/${product.id}`}>
          <motion.img 
            src={product.image || product.image_url}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            alt={product.name} 
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-6 text-center">
        <h5 className="mb-2 font-serif text-2xl font-bold text-secondary">
          <Link href={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h5>
        <p className="mb-4 text-xl font-bold text-primary">
          {product.price.toLocaleString('vi-VN')} ₫
        </p>
        <div className="mt-auto">
          <button onClick={handleAddToCart} className="flex w-full items-center justify-center space-x-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.5 13 5.999 13H14a1 1 0 000-2H5.999l-.472-1.888L7 5h10a1 1 0 00.894-1.447l-4-8A1 1 0 0013 0H6a1 1 0 00-1 1v1H3a1 1 0 000 2h.21l-.7 2.79zm11 14a1 1 0 100 2 1 1 0 000-2zm-4 0a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;