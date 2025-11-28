import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        loading: false
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        error: null,
        loading: false
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token validity
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { token, user: { id: payload.id, role: payload.role } }
          });
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authAPI.login(email, password);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Login failed'
      });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authAPI.register(userData);
      dispatch({ type: 'SET_LOADING', payload: false });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Registration failed'
      });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};