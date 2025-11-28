const Review = require("../models/review.model");

// Add a review (authenticated)
exports.addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    if (!product || !rating || !comment) {
      return res.status(400).json({ msg: "Product, rating, and comment are required" });
    }

    const review = new Review({
      product,
      rating,
      comment,
      user: req.user.id,
    });

    await review.save();
    await review.populate("user", "name email");

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// Get all reviews 
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get reviews for a specific product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate("user", "name email");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete a review (authenticated)
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({ _id: reviewId, user: userId });
    if (!review) return res.status(404).json({ msg: "Review not found" });

    await review.remove();
    res.status(200).json({ msg: "Review deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
