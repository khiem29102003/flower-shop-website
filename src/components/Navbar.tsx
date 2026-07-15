'use client';

import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client'; // Use client-side Supabase client
import CartBadge from './CartBadge';
import LogoutButton from './LogoutButton';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsAdmin(user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
    };
    getUser();
  }, [supabase]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          BELOVED BLOOM
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Trang Chủ
          </Link>
          <Link href="/orders/lookup" className={styles.navLink}>
            Lịch sử đơn hàng
          </Link>
          {isAdmin && (
            <Link href="/admin" className={`${styles.navLink} ${styles.navLinkActive}`}>
              Quản trị
            </Link>
          )}
        </div>

        <div className={styles.rightItems}>
          <CartBadge />
          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/login" className={styles.navLink}>
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
