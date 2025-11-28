const Product = require('../models/product.model');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, imageUrl, category, stock, price } = req.body;

    const product = new Product({
      name,
      description,
      imageUrl,
      category,
      stock,
      price,
      createdBy: req.user.id
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// Get All Products (with filtering, searching, sorting)
exports.getProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    let query = {};

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    let mongoQuery = Product.find(query);

    // Sorting
    if (sort) {
      let sortOption = {};
      if (sort.startsWith("-")) {
        sortOption[sort.substring(1)] = -1;
      } else {
        sortOption[sort] = 1; 
      }
      mongoQuery = mongoQuery.sort(sortOption);
    }

    const products = await mongoQuery.exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, imageUrl, category, stock, price } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl, category, stock, price },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated ", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
