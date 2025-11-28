const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct , getProductBycategory} = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Only admin can create/update/delete products
router.post('/', auth(["admin"]), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', auth(["admin"]), updateProduct);
router.delete('/:id', auth(["admin"]), deleteProduct);

module.exports = router;
