const express = require('express');
const productController = require('./controllers/productController');
const mid = require('./middlewares/products');

const productsRouter = express.Router();

productsRouter.get('/products', productController.getProducts);
productsRouter.get('/products/:id', mid.midProduct, productController.getProductsById);

module.exports = productsRouter;