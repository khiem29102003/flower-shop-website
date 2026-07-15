'use client';

import { Product } from "@/lib/mockData";
import Link from "next/link";
import { deleteProduct } from "@/app/admin/products/actions";

interface ProductListClientProps {
  products: Product[];
}

export default function ProductListClient({ products }: ProductListClientProps) {

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      event.preventDefault();
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString('vi-VN')} ₫</td>
              <td className="d-flex">
                <Link href={`/admin/products/${product.id}`} className="btn btn-sm btn-outline-primary me-2">
                  Sửa
                </Link>
                <form action={deleteProduct.bind(null, product.id)} onSubmit={handleDelete}>
                  <button type="submit" className="btn btn-sm btn-outline-danger">
                    Xóa
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
