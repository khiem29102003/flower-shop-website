import React from 'react';
import ProductList from '@/components/ProductList';

export default function ProductsPage() {
  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Tất Cả Sản Phẩm</h1>
      <ProductList />
    </div>
  );
}