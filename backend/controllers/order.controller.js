const Order = require("../models/order.model");
const Product = require("../models/product.model");

//  Create Order (User)
const createOrder = async (req, res) => {
  try {
    const { products } = req.body; // [{product, quantity}]

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: "Product not found" });
      totalPrice += product.price * item.quantity;
    }

    let order = new Order({
      user: req.user.id,
      products,
      totalPrice
    });

    await order.save();

    //  Populate before returning
    order = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("products.product", "name price imageUrl");

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

//  Get Orders (User → only own, Admin → all)
const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product", "name price imageUrl");
    } else {
      orders = await Order.find({ user: req.user.id })
        .populate("products.product", "name price imageUrl");
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

//  Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price imageUrl");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Normal user can only see their order
    if (req.user.role !== "admin" && order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// Update Order Status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    // Return populated order after update
    order = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("products.product", "name price imageUrl");

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};
