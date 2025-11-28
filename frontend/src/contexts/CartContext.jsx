import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CART':
      const items = action.payload.items || [];
      const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
      return {
        ...state,
        items,
        total,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, token } = useAuth();

  const fetchCart = async () => {
    if (!token) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await cartAPI.getCart();
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch cart' });
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      dispatch({ type: 'SET_CART', payload: { items: [] } });
    }
  }, [user, token]);

  const addToCart = async (productId, quantity = 1) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await cartAPI.addToCart(productId, quantity);
      await fetchCart();
      return true;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to add to cart' });
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await cartAPI.updateQuantity(productId, quantity);
      await fetchCart();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update quantity' });
    }
  };

  const removeFromCart = async (productId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await cartAPI.removeFromCart(productId);
      await fetchCart();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item' });
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await cartAPI.clearCart();
      await fetchCart();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    clearError,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};