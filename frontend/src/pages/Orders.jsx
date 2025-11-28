import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, CheckCircle, Truck, Clock, Home, Download } from "lucide-react";
import { ordersAPI } from "../utils/api";
import { Link } from "react-router-dom"; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalOrders: orders.length,
    completed: orders.filter((o) => o.status === "delivered").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    inProgress: orders.filter((o) =>
      ["pending", "confirmed"].includes(o.status)
    ).length,
    totalSpent: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
  };

  if (loading) {
    return <p className="text-center py-10">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6 text-green-600 flex items-center gap-2">
        <CheckCircle className="w-6 h-6" /> My Orders
      </h1>

      {/* Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <SummaryCard
          icon={<Package className="mx-auto mb-2 text-green-600" />}
          label="Total Orders"
          value={stats.totalOrders}
        />
        <SummaryCard
          icon={<CheckCircle className="mx-auto mb-2 text-emerald-600" />}
          label="Completed"
          value={stats.completed}
        />
        <SummaryCard
          icon={<Truck className="mx-auto mb-2 text-blue-600" />}
          label="Shipped"
          value={stats.shipped}
        />
        <SummaryCard
          icon={<Clock className="mx-auto mb-2 text-amber-600" />}
          label="In Progress"
          value={stats.inProgress}
        />
        <SummaryCard
          label="Total Spent"
          value={`₹${stats.totalSpent.toFixed(2)}`}
        />
      </div>

      {/* Orders List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {orders.map((order, index) =>
          order.products.map((item, i) => {
            const productId =
              typeof item.product === "object" ? item.product._id : item.product;

            return (
              <motion.div
                key={`${order._id}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(order.createdAt).toDateString()}
                  </span>
                </div>

                <img
                  src={
                    item.product?.imageUrl ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={item.product?.name || "Product"}
                  className="w-20 h-20 mx-auto object-cover rounded-lg"
                />

                <div className="mt-4 text-center">
                  <p className="font-semibold">{item.product?.name || "Product"}</p>
                  <p className="text-sm text-gray-500">
                    Qty {item.quantity} • ₹
                    {((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Buttons Row */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedOrder({ ...order, item })}
                    className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
                  >
                    Status
                  </button>

                  <Link
                    to={`/products/${productId}`}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition block"
                  >
                    Shop
                  </Link>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Order Status Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              <h2 className="text-lg font-bold mb-4">
                Order Status:{" "}
                <span className="capitalize">{selectedOrder.status}</span>
              </h2>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedOrder.item.product?.name || "Product"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Order ID {selectedOrder._id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₹{selectedOrder.totalPrice.toFixed(2)}
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline flex items-center justify-end gap-1"
                  >
                    <Download className="w-4 h-4" /> Invoice
                  </a>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Order Timeline</h4>
              <div className="relative pl-6 space-y-6 border-l border-gray-200">
                <TimelineStep
                  icon={<CheckCircle className="w-5 h-5" />}
                  label="Order Processing"
                  description="Your order has been received and is being processed"
                  active={true}
                />
                <TimelineStep
                  icon={<Truck className="w-5 h-5" />}
                  label="Shipped"
                  description="Your order has been shipped and is on the way"
                  active={["shipped", "delivered"].includes(
                    selectedOrder.status
                  )}
                />
                <TimelineStep
                  icon={<Home className="w-5 h-5" />}
                  label="Delivered"
                  description="Your order has been delivered successfully"
                  active={selectedOrder.status === "delivered"}
                  highlight={selectedOrder.status === "delivered"}
                />
              </div>

              <div className="mt-6 pt-4 border-t text-sm text-gray-700">
                Seller : <span className="font-medium">Amaan Pathan</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SummaryCard = ({ icon, label, value }) => (
  <div className="p-4 bg-white shadow rounded-xl text-center">
    {icon}
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-bold text-lg">{value}</p>
  </div>
);

const TimelineStep = ({ icon, label, description, active, highlight }) => (
  <div className="flex items-start space-x-3 relative">
    <div
      className={`p-2 rounded-full flex items-center justify-center ${
        active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
      } ${highlight ? "ring-2 ring-blue-500" : ""}`}
    >
      {icon}
    </div>
    <div>
      <p
        className={`font-medium ${active ? "text-gray-800" : "text-gray-400"}`}
      >
        {label}
      </p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export default Orders;
