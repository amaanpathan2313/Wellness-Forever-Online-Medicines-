import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const { register, user, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password' || name === 'confirmPassword') setPasswordError('');
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      alert('Account created successfully! Please log in.');
      navigate('/login');
     
    } catch (err) {
      // Error handled by auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl"
      >
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-emerald-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-3xl font-bold">Q</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="cursor-pointer font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Sign in here
            </span>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || passwordError) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <p className="text-sm text-red-600">{error || passwordError}</p>
            </motion.div>
          )}

          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="block w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="block w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="block w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="block w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500">Terms</a> and{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500">Privacy Policy</a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : 'Create account'}
          </button>

          {/* Or sign up with */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full flex justify-center py-3 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              🔍 Google
            </button>
            <button className="w-full flex justify-center py-3 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              📱 Phone
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
