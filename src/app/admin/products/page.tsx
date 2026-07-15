import { createClient } from "@/lib/supabase/server";
import ProductListClient from "@/components/admin/ProductListClient";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AdminProductsPage() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    // Handle error appropriately
  }
  
  revalidatePath('/admin/products');

  return (
    <div className="pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Quản Lý Sản Phẩm</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          Thêm Sản Phẩm Mới
        </Link>
      </div>
      <ProductListClient products={products || []} />
    </div>
  );
}