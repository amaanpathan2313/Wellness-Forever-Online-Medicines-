const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { 
    type: String, 
    enum: [
      "medicine", 
      "equipment", 
      "skin care", 
      "mother and baby care", 
      "home care", 
      "diabetic care"
    ], 
    required: true 
  },
  stock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
