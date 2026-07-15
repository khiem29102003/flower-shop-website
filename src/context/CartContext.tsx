'use client';

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
// The Product type will now be imported from mockData
import { Product } from '@/lib/mockData';

// Define the shape of a cart item
export interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Define the actions that can be performed on the cart
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'INCREASE_QUANTITY'; payload: { id: number } }
  | { type: 'DECREASE_QUANTITY'; payload: { id: number } }
  | { type: 'CLEAR_CART' };

// Create the context with a default value
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Reducer function to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If item already exists, increase quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // If item is new, add it to the cart with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0), // Remove item if quantity is 0
      };
    }
    case 'CLEAR_CART': {
        return {
            ...state,
            items: [],
        };
    }
    default:
      return state;
  }
};

// Provider component to wrap the application
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context easily
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};