const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const reviewController = require("../controllers/review.controller");

const router = express.Router();

// Routes
router.post("/", authMiddleware, reviewController.addReview);
router.get("/", reviewController.getAllReviews);
router.get("/product/:productId", reviewController.getReviewsByProduct);
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

module.exports = router;
