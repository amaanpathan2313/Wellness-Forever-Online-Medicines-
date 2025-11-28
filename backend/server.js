const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.status(200).json({msg : "Hii i an test route"})
})

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use("/api/wishlist", require("./routes/wishlist.routes"));
app.use("/api/reviews", require("./routes/review.routes"));   

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
