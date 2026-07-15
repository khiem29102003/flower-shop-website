'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function CartBadge() {
  const { state } = useCart();

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className={`${styles.navLink} ${styles.cartBadge}`}>
      Giỏ Hàng
      {totalItems > 0 && (
        <span className={styles.badge}>
          {totalItems}
        </span>
      )}
    </Link>
  );
}
