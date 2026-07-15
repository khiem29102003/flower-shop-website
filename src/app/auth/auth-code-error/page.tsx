import React from 'react';
import Link from 'next/link';

const AuthErrorPage = () => {
  return (
    <div className="text-center p-5">
      <h1 className="display-5 text-danger">Lỗi Xác Thực</h1>
      <p className="lead">Đã có lỗi xảy ra trong quá trình xác thực.</p>
      <p>Mã xác thực có thể đã hết hạn hoặc không hợp lệ.</p>
      <hr className="my-4" />
      <p>Vui lòng thử đăng nhập lại.</p>
      <Link href="/login" className="btn btn-primary btn-lg mt-3">
        Quay lại trang Đăng nhập
      </Link>
    </div>
  );
};

export default AuthErrorPage;
