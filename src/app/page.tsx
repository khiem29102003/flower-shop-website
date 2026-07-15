import React from 'react';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
            Sản Phẩm Của Chúng Tôi
          </h2>
          <ProductList />
        </div>
      </section>
    </>
  );
}