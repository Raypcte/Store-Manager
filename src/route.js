const express = require('express');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const mid = require('./middlewares/products');

const productsRouter = express.Router();
const salesRouter = express.Router();

// ROTA DOS PRODUTOS
productsRouter.get('/products', productController.getProducts);
productsRouter.put('/products/:id', mid.midProduct, productController.updateProductsById);
productsRouter.get('/products/:id', mid.midProduct, productController.getProductsById);
productsRouter.post('/products', mid.validationName, productController.createNewProducts);

// ROTA DAS VENDAS
salesRouter.get('/sales', salesController.getSales);
salesRouter.get('/sales/:id', mid.midSales, salesController.getSalesByID);
salesRouter.post(
  '/sales',
  mid.productId,
  mid.quantity,
  mid.productFound,
  salesController.createSales,
);

module.exports = {
  productsRouter,
  salesRouter,
};
