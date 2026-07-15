'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const ReviewPage = () => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { shippingInfo } = useCheckout();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = cartState.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    const supabase = createClient();

    const orderData = {
      customer_email: shippingInfo.email,
      total_price: totalPrice,
      order_details: {
        shippingInfo,
        items: cartState.items,
      },
      status: 'pending',
    };

    const { error: insertError } = await supabase.from('orders').insert([orderData]);

    if (insertError) {
      setError(`Lỗi khi đặt hàng: ${insertError.message}`);
      setLoading(false);
      return;
    }

    // Clear the cart
    cartDispatch({ type: 'CLEAR_CART' });

    // Redirect to a thank you page
    router.push('/checkout/thank-you');
  };

  // Redirect if cart is empty or shipping info is missing
  if (cartState.items.length === 0 || !shippingInfo.fullName) {
    return (
        <div className="text-center p-5">
            <h2>Thông tin đơn hàng không hợp lệ.</h2>
            <p>Có vẻ như giỏ hàng của bạn đang trống hoặc bạn chưa điền thông tin giao hàng.</p>
            <Link href="/cart" className="btn btn-primary mt-3">Quay lại giỏ hàng</Link>
        </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4">Xem Lại Đơn Hàng</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-7">
          <h4>Chi tiết đơn hàng</h4>
          <ul className="list-group mb-3">
            {cartState.items.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">Số lượng: {item.quantity}</small>
                </div>
                <span className="text-muted">{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Tổng cộng (VND)</span>
              <strong>{totalPrice.toLocaleString('vi-VN')} ₫</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-5">
          <h4>Thông tin giao hàng</h4>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{shippingInfo.fullName}</h5>
              <p className="card-text mb-1"><strong>Email:</strong> {shippingInfo.email}</p>
              <p className="card-text mb-1">{shippingInfo.phone}</p>
              <p className="card-text">{shippingInfo.address}</p>
              <Link href="/checkout" className="card-link">Chỉnh sửa</Link>
            </div>
          </div>
          <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg w-100 mt-4" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Xác Nhận & Đặt Hàng'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
