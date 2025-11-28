import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Medicine', key: 'medicine' },
  { name: 'Equipment', key: 'equipment' },
  { name: 'Skin Care', key: 'skin care' },
  { name: 'Mother & Baby Care', key: 'mother and baby care' },
  { name: 'Home Care', key: 'home care' },
  { name: 'Diabetic Care', key: 'diabetic care' }
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">WF</span>
              </div>
              <div>
                <div className="text-xl font-bold">Wellness Forever</div>
                <div className="text-sm text-gray-400">Healthcare & Wellness</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for medicines, medical equipment, and wellness products. 
              We deliver authentic healthcare products with same-day delivery and expert care.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.key}
                  to={`/products?category=${encodeURIComponent(category.key)}`}
                  className="block text-gray-300 hover:text-emerald-400 transition-colors text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Support</h3>
            <div className="space-y-3">
              <Link to="#" className="block text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                Help Center
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                Order Tracking
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                Returns & Exchanges
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                Shipping Information
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                FAQ
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Customer Service</p>
                  <p className="text-sm font-medium"></p>
                  <p className="text-sm font-medium">+91 9437654567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Email Support</p>
                  <p className="text-sm font-medium">weleness@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Support Hours</p>
                  <p className="text-sm font-medium">24/7 Available</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Headquarters</p>
                  <p className="text-sm font-medium">201 wellness Forever<br />Panvel, Navi Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-sm text-gray-400">
                © 2025 Wellness Forever. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
                <Link to="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Secure payments with</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
                <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
