import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  MapPin,
  Calendar,
  Package,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ordersAPI } from '../utils/api';

function Cart() {
  const { items, total, updateQuantity, removeFromCart, clearCart, loading } = useCart();
  const [placing, setPlacing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shippingOption, setShippingOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [error, setError] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    pinCode: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.trim() !== '') {
      setAppliedPromo(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateOrderTotal = () => {
    const subtotal = total;
    const shippingCost = shippingOption === 'express' ? 100 : 50;
    const tax = (subtotal + shippingCost) * 0.07;
    return {
      subtotal,
      shipping: shippingCost,
      tax,
      total: subtotal + shippingCost + tax
    };
  };

  const handleProceedToReview = () => {
    setCheckoutStep('review');
  };

  const handleContinueToShipping = () => {
    setCheckoutStep('shipping');
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
        !shippingInfo.pinCode || !shippingInfo.phone) {
      setError('Please fill in all required shipping information');
      return;
    }

    setPlacing(true);
    setError(null);
    
    try {
      const orderProducts = items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));

      await ordersAPI.createOrder(orderProducts);
      
      await clearCart();
      setCheckoutStep('confirmation');
    } catch (error) {
      console.error('Failed to place order:', error);
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDays = shippingOption === 'express' ? 1 : 3;
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
    return deliveryDate.toDateString();
  };

  if (items.length === 0 && !loading && checkoutStep === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
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
        
        {/* Checkout Progress */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {['cart','review','shipping','confirmation'].map((step, idx) => {
              const icons = [<ShoppingCart/>, <Package/>, <MapPin/>, <CheckCircle/>];
              const labels = ['Cart','Review','Shipping','Confirm'];
              const active = checkoutStep === step || (step !== 'cart' && ['review','shipping','confirmation'].includes(checkoutStep) && idx <= ['cart','review','shipping','confirmation'].indexOf(checkoutStep));
              return (
                <React.Fragment key={step}>
                  <div className={`flex flex-col items-center ${active ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                      {React.cloneElement(icons[idx], { className: 'h-5 w-5' })}
                    </div>
                    <span className="text-sm mt-2">{labels[idx]}</span>
                  </div>
                  {idx < 3 && (
                    <div className={`w-16 h-1 mx-2 ${['review','shipping','confirmation'].includes(checkoutStep) && idx < ['cart','review','shipping','confirmation'].indexOf(checkoutStep) ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">&times;</button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* CART STEP */}
         
  {checkoutStep === 'cart' && (
  <motion.div
    key="cart"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full"
  >

    {/* LEFT SECTION */}
    <div className="lg:col-span-2 flex flex-col space-y-6 h-full">

      {/* Cart Items */}
      {items.map((item) => (
        <motion.div
          key={item.product._id}
          layout
          className="bg-emerald-50 rounded-xl p-6 shadow-sm flex gap-5"
        >
          {/* Product Image */}
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-24 h-24 object-cover rounded-lg"
          />

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-500">{item.product.category}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>

            {/* Price and Quantity Controls (now aligned right, below price) */}
            <div className="flex justify-between items-center mt-3">
              <div className="font-semibold">
                ₹{(item.product.price * item.quantity).toFixed(2)}
                <span className="ml-2 text-sm text-gray-500">
                  {item.product.price.toFixed(2)} each
                </span>
              </div>
              <div className="flex items-center space-x-2 border rounded-md px-2 py-1">
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Continue Shopping */}
      <button
        onClick={handleContinueShopping}
        className="flex items-center text-emerald-600 font-medium"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Continue Shopping
      </button>

      {/* Delivery + Customer Benefits */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Delivery Options */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Truck className="h-5 w-5 text-emerald-600 mr-2" /> Delivery Options
          </h3>
          {['standard', 'express'].map(option => (
            <div
              key={option}
              onClick={() => setShippingOption(option)}
              className={`flex justify-between p-3 rounded-lg cursor-pointer transition mb-2 ${
                shippingOption === option
                  ? 'border-emerald-500 bg-emerald-50 border'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div>
                <p className="font-medium">
                  {option === 'standard' ? 'Standard Delivery' : 'Express Delivery'}
                </p>
                <p className="text-xs text-gray-500">
                  {option === 'standard' ? '2-3 business days' : 'Next business day'}
                </p>
              </div>
              <span className="font-semibold">
                ₹{option === 'standard' ? 50 : 70}
              </span>
            </div>
          ))}
        </div>

        {/* Customer Benefits */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CreditCard className="h-5 w-5 text-emerald-600 mr-2" /> Customer Benefits
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-emerald-600" /> Free shipping on orders over ₹500
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" /> 30-day money-back guarantee
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" /> 100% organic certified products
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* ORDER SUMMARY */}
    <div className="lg:col-span-1 flex flex-col h-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-semibold mb-5">Order Summary</h2>
          {(() => {
            const { subtotal, shipping, tax, total: grandTotal } = calculateOrderTotal();
            return (
              <>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tax (7%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </>
            );
          })()}
        </div>

        <div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Promo code"
              className="border rounded-l-md px-3 py-2 w-full"
            />
            <button className="bg-emerald-600 text-white px-4 rounded-r-md">
              Apply
            </button>
          </div>
          <button
            onClick={handleProceedToReview}
            className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          >
            Proceed to Checkout →
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">
          </p>
        </div>
      </div>
    </div>
  </motion.div>
)}



          {/* REVIEW STEP */}
          {checkoutStep === 'review' && (
            <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white p-6 rounded-xl shadow max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>
              {items.map(item => (
                <div key={item.product._id} className="flex justify-between border-b py-2">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>₹{(item.product.price*item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{(total+(shippingOption==='express'?100:50)+(total*0.07)).toFixed(2)}</span>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={()=>setCheckoutStep('cart')} className="px-4 py-2 border rounded-lg">Back</button>
                <button onClick={handleContinueToShipping} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Continue</button>
              </div>
            </motion.div>
          )}

          {/* SHIPPING STEP */}
          {checkoutStep === 'shipping' && (
            <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <form className="space-y-4">
                <input name="fullName" value={shippingInfo.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full border px-3 py-2 rounded-lg"/>
                <input name="email" value={shippingInfo.email} onChange={handleInputChange} placeholder="Email" className="w-full border px-3 py-2 rounded-lg"/>
                <input name="address" value={shippingInfo.address} onChange={handleInputChange} placeholder="Address" className="w-full border px-3 py-2 rounded-lg"/>
                <div className="grid grid-cols-2 gap-4">
                  <input name="pinCode" value={shippingInfo.pinCode} onChange={handleInputChange} placeholder="PIN Code" className="border px-3 py-2 rounded-lg"/>
                  <input name="phone" value={shippingInfo.phone} onChange={handleInputChange} placeholder="Phone" className="border px-3 py-2 rounded-lg"/>
                </div>
              </form>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${paymentMethod==='cod'?'border-emerald-500 bg-emerald-50':'border-gray-200'}`}>
                    <input type="radio" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')} className="mr-2"/> Cash on Delivery
                  </label>
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${paymentMethod==='online'?'border-emerald-500 bg-emerald-50':'border-gray-200'}`}>
                    <input type="radio" checked={paymentMethod==='online'} onChange={()=>setPaymentMethod('online')} className="mr-2"/> Online Payment
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={()=>setCheckoutStep('review')} className="px-4 py-2 border rounded-lg">Back</button>
                <button onClick={handlePlaceOrder} disabled={placing} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">{placing?'Placing...':'Place Order'}</button>
              </div>
            </motion.div>
          )}

          {/* CONFIRMATION STEP */}
          {checkoutStep === 'confirmation' && (
            <motion.div key="confirmation" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white p-8 rounded-xl shadow max-w-xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-emerald-600"/>
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
              <p className="text-gray-600 mb-6">Your order has been placed. A confirmation email has been sent.</p>
              <button onClick={handleContinueShopping} className="px-6 py-3 bg-emerald-600 text-white rounded-lg">Continue Shopping</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Cart;
