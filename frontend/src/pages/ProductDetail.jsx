import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Loader2
} from 'lucide-react';
import { productsAPI, wishlistAPI } from '../utils/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  //  Reviews State
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to load product details');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    setCartLoading(true);
    try {
      const success = await addToCart(product._id, quantity);
      if (success) {
        alert(`Added ${quantity} item(s) to cart!`);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }

    setWishlistLoading(true);
    try {
      await wishlistAPI.addToWishlist(product._id);
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      alert('Failed to add to wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  //  Submit Review (local only)
  const handleSubmitReview = () => {
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide a rating and comment');
      return;
    }

    const newReview = {
      id: Date.now(),
      user: user?.name || 'Anonymous',
      rating,
      comment,
      date: new Date().toLocaleString(),
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1587854692152-1c30909dc9e1?q=80&w=800&auto=format&fit=crop';
  const image = product.imageUrl || product.image || defaultImage;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src={image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category */}
            <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-full">
              {product.category}
            </span>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) • 127 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div>
              <span className="text-4xl font-bold text-gray-900">
                ₹{product.price?.toFixed(2) || '0.00'}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'This is a high-quality healthcare product designed to meet your medical and wellness needs. Sourced from trusted manufacturers and thoroughly tested for quality and safety.'}
              </p>
            </div>

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div>
                {product.stock > 0 ? (
                  <div className="flex items-center text-emerald-600">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                    <span className="font-medium">In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={cartLoading || (product.stock !== undefined && product.stock === 0)}
                className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cartLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ShoppingCart className="h-5 w-5" />
                )}
                <span>{cartLoading ? 'Adding...' : 'Add to Cart'}</span>
              </button>
              
              <button
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
                className="flex items-center justify-center space-x-2 px-6 py-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {wishlistLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Heart className="h-5 w-5" />
                )}
                <span className="hidden sm:inline">
                  {wishlistLoading ? 'Adding...' : 'Wishlist'}
                </span>
              </button>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Truck className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>Free same-day delivery</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>100% authentic product</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>Expert approved quality</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ⭐ Reviews Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h3>

          {/* Add Review */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`h-6 w-6 cursor-pointer ${
                    i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
            <button
              onClick={handleSubmitReview}
              className="mt-3 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Submit Review
            </button>
          </div>

          {/* Review List */}
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900">{rev.user}</span>
                    <span className="text-sm text-gray-500">{rev.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rev.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
