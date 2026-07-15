import ProductForm from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    // Handle error appropriately
  }

  return (
    <div className="pt-4">
      <h1>Chỉnh Sửa Sản Phẩm</h1>
      <ProductForm product={product} />
    </div>
  );
}