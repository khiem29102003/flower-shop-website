'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const CartPage = () => {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id } });
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
  };

  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="mb-4">Giỏ Hàng Của Bạn</h1>
      {state.items.length === 0 ? (
        <div className="text-center p-5 border rounded">
          <p className="fs-4">Giỏ hàng của bạn đang trống.</p>
          <Link href="/" className="btn btn-primary mt-3">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <ul className="list-group mb-4">
              {state.items.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={item.image_url} alt={item.name} style={{width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px'}} className="rounded"/>
                    <div>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="mb-1 text-muted">{item.price.toLocaleString('vi-VN')} ₫</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group" style={{width: '140px'}}>
                      <button onClick={() => handleDecreaseQuantity(item.id)} className="btn btn-outline-secondary" type="button">-</button>
                      <span className="form-control text-center">{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item.id)} className="btn btn-outline-secondary" type="button">+</button>
                    </div>
                    <button onClick={() => handleRemoveItem(item.id)} className="btn btn-danger btn-sm ms-3">
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="card sticky-top" style={{top: '2rem'}}>
              <div className="card-body">
                <h5 className="card-title">Tổng Cộng</h5>
                <p className="card-text fs-3 fw-bold">
                  {totalPrice.toLocaleString('vi-VN')} ₫
                </p>
                <Link href="/checkout" className="btn btn-primary w-100">
                  Tiến hành thanh toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;