'use client';

import { Product } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from 'react-dom';
import { upsertProduct } from '@/app/admin/products/actions';

interface ProductFormProps {
  product?: Product | null;
}

// A client component to show pending state on the submit button
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
    </button>
  );
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(upsertProduct, null);

  return (
    <form action={formAction} className="mt-4">
      {state?.error && (
        <div className="alert alert-danger">{state.error}</div>
      )}
      
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      {/* Add a hidden field to hold the existing image URL */}
      {product?.image && <input type="hidden" name="existingImage" value={product.image} />}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Tên Sản Phẩm</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          defaultValue={product?.name}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Mô Tả</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="price" className="form-label">Giá (VND)</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            defaultValue={product?.price}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="imageFile" className="form-label">Hình Ảnh Sản Phẩm</label>
          <input
            type="file"
            className="form-control"
            id="imageFile"
            name="imageFile"
            accept="image/*"
          />
          {product?.image && (
            <div className="mt-2">
              <p>Ảnh hiện tại:</p>
              <img src={product.image} alt={product.name} width="100" className="img-thumbnail" />
            </div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={() => router.push('/admin/products')}>
          Hủy
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}
