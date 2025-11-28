const express = require("express");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlist.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

// Add product to wishlist
router.post("/add", auth(["user", "admin"]), addToWishlist);

// Remove product from wishlist
router.post("/remove", auth(["user", "admin"]), removeFromWishlist);

// Get wishlist
router.get("/", auth(["user", "admin"]), getWishlist);

module.exports = router;
