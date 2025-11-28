import axios from 'axios';

// const API_BASE = 'https://quickmed-logistics-and-transportation.onrender.com/api';
const API_BASE = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (userData) => api.post('/users/register', userData),
};

// Products API
export const productsAPI = {
  // Get all products with filters
  getAll: ({ category, search, sort } = {}) =>
    api.get('/products', {
      params: { category, search, sort },
    }),

  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),

  // Create new product
  create: (data) => api.post('/products', data),

  // Update product
  update: (id, data) => api.put(`/products/${id}`, data),

  // Delete product
  delete: (id) => api.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
  updateQuantity: (productId, quantity) => api.put('/cart', { productId, quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart'),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post('/wishlist/add', { productId }),
  removeFromWishlist: (productId) => api.post('/wishlist/remove', { productId }),
};

// Orders API
export const ordersAPI = {
  createOrder: (products) => api.post('/orders', { products }),
  getOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

// Reviews API
export const reviewsAPI = {
  getReviews: (productId) => api.get(`/reviews/${productId}`),
  addReview: (data) => api.post('/reviews', data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export default api;
