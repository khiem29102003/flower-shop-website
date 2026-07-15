import React from 'react';
import { createClient } from '@/lib/supabase/server';
import ProductCard from './ProductCard';
import { Product } from '@/lib/mockData';

// This is now an async function to fetch data from Supabase
async function getProducts() {
  const supabase = createClient();
  // Select data from the 'products' table
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    // We can return an empty array or throw the error
    // For now, returning an empty array is safer for rendering
    return [];
  }

  return data as Product[];
}

// The component is now a server component that fetches its own data
const ProductList = async () => {
  let products = await getProducts();

  if (products.length === 0) {
    return (
        <div className="text-center p-5 border rounded">
            <p className="fs-4">Không có sản phẩm nào để hiển thị.</p>
            <p>Có thể bạn chưa tạo bảng `products` hoặc chèn dữ liệu vào đó.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;