'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export async function deleteProduct(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().match({ id });

  if (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }

  revalidatePath('/admin/products');
  return { success: true };
}

export async function upsertProduct(prevState: any, formData: FormData) {
  const supabase = createClient();
  
  const id = formData.get('id');
  const imageFile = formData.get('imageFile') as File;
  let imageUrl = formData.get('existingImage') as string; // Keep existing image by default

  // --- Handle File Upload ---
  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return { error: 'Lỗi khi tải ảnh lên. Vui lòng thử lại.' };
    }

    // Get public URL for the newly uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    imageUrl = publicUrlData.publicUrl;
  }

  const productData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    image: imageUrl,
  };

  // Basic validation
  if (!productData.name || !productData.description || !productData.price || !productData.image) {
    return { error: 'Vui lòng điền đầy đủ thông tin và cung cấp hình ảnh.' };
  }

  let error;

  if (id) {
    // Update
    ({ error } = await supabase.from('products').update(productData).match({ id }));
  } else {
    // Create
    ({ error } = await supabase.from('products').insert(productData));
  }

  if (error) {
    console.error('Error upserting product:', error);
    return { error: 'Đã có lỗi xảy ra. Vui lòng thử lại.' };
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}