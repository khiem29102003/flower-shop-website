import Link from 'next/link';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="row">
      <nav className="col-md-2 d-none d-md-block bg-light sidebar vh-100">
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" href="/admin">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/admin/products">
                Sản phẩm
              </Link>
            </li>
            {/* Add other admin links here, e.g., Orders */}
          </ul>
        </div>
      </nav>
      <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        {children}
      </main>
    </div>
  );
}
