import React, { createContext, useContext, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext();

const initialState = {
  toasts: []
};

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() }]
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (message, type = 'success') => {
    dispatch({
      type: 'ADD_TOAST',
      payload: { message, type }
    });

    setTimeout(() => {
      removeToast();
    }, 5000);
  };

  const removeToast = (id) => {
    if (id) {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    } else {
      if (state.toasts.length > 0) {
        dispatch({ type: 'REMOVE_TOAST', payload: state.toasts[0].id });
      }
    }
  };

  const value = {
    toasts: state.toasts,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center space-x-3 p-4 rounded-xl shadow-lg max-w-sm ${
              toast.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : toast.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600" />}
            {toast.type === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
            {toast.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-600" />}
            
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast() {
  return null; 
}

export default Toast;