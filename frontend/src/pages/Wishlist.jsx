import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { wishlistAPI } from '../utils/api';
import { useCart } from '../contexts/CartContext';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist();
      setWishlist(response.data?.products || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const success = await addToCart(product._id, 1);
      if (success) {
        alert(`${product.name} added to cart!`);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save products you like to find them easily later</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
            <p className="text-gray-600 mt-1">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Wishlist Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <Link to={`/products/${product._id}`}>
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1587854692152-1c30909dc9e1?q=80&w=400&auto=format&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full mb-2">
                  {product.category}
                </span>
                
                <Link to={`/products/${product._id}`}>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="text-2xl font-bold text-gray-900 mb-4">
                  ₹{product.price?.toFixed(2) || '0.00'}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;