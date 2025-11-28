// Products.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { productsAPI } from '../utils/api';
import ProductCard from '../components/products/ProductCard';

const CATEGORIES = [
  { key: 'all', label: 'All Products' },
  { key: 'medicine', label: 'Medicine' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'skin care', label: 'Skin Care' },
  { key: 'mother and baby care', label: 'Mother & Baby Care' },
  { key: 'home care', label: 'Home Care' },
  { key: 'diabetic care', label: 'Diabetic Care' }
];

const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: '-name', label: 'Name (Z-A)' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: '-price', label: 'Price (High to Low)' },
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt', label: 'Oldest First' }
];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');

  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const itemsPerPage = 12;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      const category = searchParams.get('category') || 'all';
      const search = searchParams.get('search') || '';
      const sort = searchParams.get('sort') || 'name';

      if (search) params.search = search;
      if (category !== 'all') params.category = category;
      if (sort) params.sort = sort;

      const response = await productsAPI.getAll(params);
      setProducts(
        Array.isArray(response.data)
          ? response.data
          : response.data?.products || []
      );
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
    setSortBy(searchParams.get('sort') || 'name');
    setCurrentPage(parseInt(searchParams.get('page')) || 1);
    fetchProducts();
  }, [searchParams]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') newParams.delete('category');
    else newParams.set('category', category);
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set('search', value);
    else newParams.delete('search');
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set('sort', value);
    else newParams.delete('sort');
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page);
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-emerald-50">

      {/* Hero Section */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          src="https://www.medplusindia.com/images/news-medplus-plans-to-open-bnr.jpg"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Your source for organics
          </h1>
          <button
            onClick={handleResetFilters}
            className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold shadow-md"
          >
            ALL PRODUCTS
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="bg-white border-b border-emerald-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center md:space-x-6 space-y-3 md:space-y-0">
          
          {/* Category */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <label className="font-medium text-emerald-700">Categories</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2 border border-emerald-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <label className="font-medium text-emerald-700">Sort By</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-2 border border-emerald-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-2 w-full md:flex-1">
            <label className="font-medium text-emerald-700">Search</label>
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Name, Categories..."
                className="w-full px-4 py-2 pl-10 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p className="text-emerald-600">Loading...</p>
        ) : currentProducts.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6 text-sm text-emerald-700">
              <p>
                Showing <span className="font-semibold">{indexOfFirstProduct + 1}</span> –{" "}
                <span className="font-semibold">{Math.min(indexOfLastProduct, products.length)}</span>{" "}
                of <span className="font-semibold">{products.length}</span> products
              </p>
              <p>
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </p>
            </div>

            {/* 4 columns */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Simplified Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-4 py-2 bg-white border border-emerald-300 rounded-md text-emerald-700 font-semibold">
                {currentPage}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              No products found
            </h3>
            <p className="text-emerald-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
