const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

// User/Admin → Place Order
router.post("/", auth(["user", "admin"]), createOrder);

// User → See own orders | Admin → See all orders
router.get("/", auth(["user", "admin"]), getOrders);

// Get single order
router.get("/:id", auth(["user", "admin"]), getOrderById);

// Admin → Update order status
router.put("/:id/status", auth(["admin"]), updateOrderStatus);

module.exports = router;
