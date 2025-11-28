import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  Package,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">WF</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">Wellness Forever</div>
              <div className="text-xs text-gray-500 -mt-1">Healthcare & Wellness</div>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-sm font-medium transition-colors ${
                isActive('/products') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Products
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${
                isActive('/blog') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/wishlist"
                  className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  title="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Link>

                <Link
                  to="/cart"
                  className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  title="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-1 p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">Account</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Package className="h-4 w-4" />
                          <span>Orders</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="space-y-2">
                <Link to="/" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link to="/products" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
                <Link to="/blog" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                  Blog
                </Link>
                <Link to="/contact" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>

                {user ? (
                  <>
                    <Link to="/cart" className="flex items-center justify-between py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                      <span>Cart</span>
                      {cartItemsCount > 0 && (
                        <span className="bg-emerald-600 text-white text-xs rounded-full px-2 py-1">
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/wishlist" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                      Wishlist
                    </Link>
                    <Link to="/profile" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/orders" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block py-2 text-gray-700 hover:text-emerald-600" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                    <Link to="/signup" className="block py-2 text-emerald-600 font-medium" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
