import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail  from'./pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import './app.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/wishlist" element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;