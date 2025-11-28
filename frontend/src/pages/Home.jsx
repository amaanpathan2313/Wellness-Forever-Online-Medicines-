import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Truck,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Package,
  Heart,
  Zap
} from 'lucide-react';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1lZGljaW5lfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1622227922682-56c92e523e58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxtZWRpY2luZXxlbnwwfHwwfHx8MA%3D%3D",
];

const CATEGORIES = [
  { name: 'Medicine', key: 'medicine', image: 'https://imgix-prod.sgs.com/-/media/sgscorp/images/temporary/hero-grouped-medicines-1600px.cdn.en-PK.1.png?fit=crop&auto=format&crop=focalpoint&fp-x=0&fp-y=0&fp-z=1&w=645&h=403', description: 'Prescription & OTC medications' },
  { name: 'Medical Equipment', key: 'equipment', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop', description: 'Professional medical devices' },
  { name: 'Skin Care', key: 'skin care', image: 'https://i.pinimg.com/736x/f2/e5/52/f2e552684f8d5a06d650db08ea4848c6.jpg', description: 'Dermatologist recommended' },
  { name: 'Mother & Baby Care', key: 'mother and baby care', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop', description: 'Safe products for families' },
  { name: 'Home Care', key: 'home care', image: 'https://i.pinimg.com/736x/90/08/f5/9008f5de61dc2454f432625d4958bc85.jpg', description: 'Healthcare essentials' },
  { name: 'Diabetic Care', key: 'diabetic care', image: 'https://api.parashospitals.com/uploads/2020/06/Diabetes.jpg', description: 'Diabetes management tools' }
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev === HERO_IMAGES.length - 1 ? 0 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-6">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Healthcare <span className="block text-emerald-300">Delivered Fast</span>
              </h1>
              <p className="text-lg lg:text-2xl mt-4 max-w-2xl">
                Your trusted partner for medicines, medical equipment, and wellness products with same-day delivery
              </p>
              <div className="flex gap-4 mt-6">
                <Link
                  to="/products"
                  className="px-6 py-3 bg-emerald-600 rounded-full font-semibold hover:bg-emerald-700 transition"
                >
                  Shop Now
                </Link>
                <button className="px-6 py-3 border-2 border-white rounded-full hover:bg-white hover:text-emerald-600 transition">
                  24/7 Support
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-emerald-700 mb-4">
              Why Choose QuickMed?
            </h2>
            <p className="text-xl text-emerald-600 max-w-3xl mx-auto">
              We're committed to providing the best healthcare experience with quality products and exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
              icon: Zap,
              title: 'Fast Delivery',
              description: 'Same-day delivery for urgent medical needs within 2-4 hours'
            }, {
              icon: Shield,
              title: '100% Authentic',
              description: 'All products are sourced directly from verified manufacturers'
            }, {
              icon: Package,
              title: 'Easy Returns',
              description: 'Hassle-free returns and exchanges with full money-back guarantee'
            }, {
              icon: Heart,
              title: 'Expert Care',
              description: 'Professional pharmacists and healthcare experts at your service'
            }].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">{feature.title}</h3>
                <p className="text-emerald-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-emerald-700 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-emerald-600">
              Find everything you need for your health and wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(category.key)}`}
                  className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-emerald-700 mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-emerald-600 mb-4">{category.description}</p>
                    <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Newsletter Section */}
<section className="py-20 bg-emerald-100">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-emerald-800 mb-4">
        Stay Updated with Health Tips
      </h2>
      <p className="text-xl text-emerald-700 mb-8">
        Get the latest health advice, product updates, and exclusive offers delivered to your inbox
      </p>
      <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
        <button
          type="submit"
          className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  </div>
</section>

    </div>
  );
}

export default Home;
