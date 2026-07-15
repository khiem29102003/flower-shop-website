'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of shipping information
export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  email: string;
}

// Define the shape of the context state
interface CheckoutContextState {
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
}

// Create the context
const CheckoutContext = createContext<CheckoutContextState | undefined>(undefined);

// Provider component
export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    phone: '',
    address: '',
    email: '',
  });

  return (
    <CheckoutContext.Provider value={{ shippingInfo, setShippingInfo }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use the checkout context
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
