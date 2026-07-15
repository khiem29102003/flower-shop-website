import React from 'react';
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className="text-center p-5">
      <h1 className="display-4">Cảm ơn bạn!</h1>
      <p className="lead">Đơn hàng của bạn đã được đặt thành công.</p>
      <hr className="my-4" />
      <p>Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
      <Link href="/" className="btn btn-primary btn-lg mt-3">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
};

export default ThankYouPage;
