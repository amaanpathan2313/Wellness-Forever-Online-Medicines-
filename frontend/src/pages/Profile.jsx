import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';

function Profile({ signupData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: signupData?.name || '',
    email: signupData?.email || '',
    phone: '',
    address: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(formData));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) setFormData(JSON.parse(savedData));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-emerald-600 mb-8 text-center">My Profile</h1>
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Profile Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-all hover:shadow-xl">
              <div className="w-32 h-32 mb-4 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                <User className="h-16 w-16 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-emerald-600 mb-1">{formData.name || 'User Name'}</h3>
              <p className="text-gray-600 mb-1">{formData.email || ''}</p>
              {formData.phone && <p className="text-gray-600 mb-1">📞 {formData.phone}</p>}
              {formData.dateOfBirth && <p className="text-gray-600 mb-1">🎂 {formData.dateOfBirth}</p>}
              {formData.address && <p className="text-gray-600 text-center mt-2">📍 {formData.address}</p>}
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-semibold text-emerald-600">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <textarea
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your address"
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none transition"
                    />
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
