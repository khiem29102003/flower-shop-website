'use client';

import React, { useState } from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { shippingInfo, setShippingInfo } = useCheckout();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.email) {
      setError('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }
    setError('');
    router.push('/checkout/review');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="mb-4">Thông Tin Giao Hàng</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Họ và Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Số Điện Thoại</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Địa Chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Xem Lại Đơn Hàng
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
