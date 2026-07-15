'use client';

import React, { useState } from 'react';

// Define types for our order data for better TypeScript support
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  email: string;
}

interface Order {
  id: number;
  created_at: string;
  customer_email: string;
  total_price: number;
  status: string;
  order_details: {
    items: OrderItem[];
    shippingInfo: ShippingInfo;
  };
}

const OrderLookupPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  const translateStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Đang xử lý';
      case 'completed':
        return 'Hoàn thành';
      case 'shipped':
        return 'Đang giao hàng';
      default:
        return status;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrders([]);

    if (!email) {
      setError('Vui lòng nhập địa chỉ email của bạn.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Đã có lỗi xảy ra.');
      }
      
      if (data.orders && data.orders.length > 0) {
        setOrders(data.orders);
      } else {
        setError('Không tìm thấy đơn hàng nào với email này.');
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="mb-4">Tra Cứu Lịch Sử Đơn Hàng</h1>
        <div className="card mb-4">
          <div className="card-body">
            <p className="card-text">Nhập địa chỉ email bạn đã sử dụng khi mua hàng để xem lịch sử các đơn hàng của bạn.</p>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Đang tìm kiếm...' : 'Tra Cứu Đơn Hàng'}
              </button>
            </form>
          </div>
        </div>

        {orders.length > 0 && (
          <div>
            <h2>Các Đơn Hàng Của Bạn</h2>
            {orders.map(order => (
              <div key={order.id} className="card mb-3">
                <div className="card-header d-flex justify-content-between">
                  <span><strong>Mã Đơn:</strong> #{order.id}</span>
                  <span><strong>Ngày Đặt:</strong> {new Date(order.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {order.order_details.items.map(item => (
                      <li key={item.id} className="list-group-item d-flex justify-content-between">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <span><strong>Trạng thái:</strong> <span className="badge bg-primary">{translateStatus(order.status)}</span></span>
                  <strong>Tổng cộng: {order.total_price.toLocaleString('vi-VN')} ₫</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderLookupPage;
