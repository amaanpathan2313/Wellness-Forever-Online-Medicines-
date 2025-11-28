import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Loader2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { wishlistAPI } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    setLoading(true);
    try {
      await addToCart(product._id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }

    setWishlistLoading(true);
    try {
      await wishlistAPI.addToWishlist(product._id);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const defaultImage = 'https://i.pinimg.com/736x/1e/4f/bf/1e4fbfd6affc5691975a38016664f77a.jpg';
  const image = product.imageUrl || product.image || defaultImage;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link to={`/products/${product._id}`}>
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full mb-2">
                {product.category}
              </span>
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">(4.0)</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price?.toFixed(2) || '0.00'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
                className="p-2 border border-gray-200 rounded-full hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors disabled:opacity-50"
                title="Add to wishlist"
              >
                {wishlistLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>

          {product.stock !== undefined && (
            <div className="mt-3">
              {product.stock > 0 ? (
                <span className="text-sm text-emerald-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;