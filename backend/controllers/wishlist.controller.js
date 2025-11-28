const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ msg: "Product already in wishlist" });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ msg: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get user wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

    if (!wishlist) return res.status(200).json({ products: [] });

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
