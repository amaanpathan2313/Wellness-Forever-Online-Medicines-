const express = require("express");
const { addToCart, getCart, updateCartItem, removeCartItem, clearCart } = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

// Only logged-in users can use cart
router.post("/", auth(["user", "admin"]), addToCart);
router.get("/", auth(["user", "admin"]), getCart);
router.put("/", auth(["user", "admin"]), updateCartItem);
router.delete("/:productId", auth(["user", "admin"]), removeCartItem);
router.delete("/", auth(["user", "admin"]), clearCart);

module.exports = router;
