const productModel = require('../models/productModel');
const salesModel = require('../models/modelSales');

const midProduct = async (req, res, next) => {
  const { id } = req.params;
  const dados = await productModel.getProductFromID(id);

  if (!dados.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const midSales = async (req, res, next) => {
  const { id } = req.params;
  const dados = await salesModel.getSalesFromID(id);

  if (!dados.length) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const productId = (req, res, next) => {
  const sales = req.body;
  const existProducts = sales.some((sale) => sale.productId === undefined);
  if (existProducts) {
    return res.status(400).json({ message: '"productId" is required' });
  } next();
};

const quantity = (req, res, next) => {
  const sales = req.body;
  const existQuantity = sales.some((sale) => sale.quantity === undefined);
  if (existQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  const quantityValue = sales.some((sale) => sale.quantity <= 0);
  if (quantityValue) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  } next();
};

const productFound = async (req, res, next) => {
  const sales = req.body;
  const products = await productModel.getAllProducts();
  console.log(products, sales, 'todos produtos');
  for (let i = 0; i < sales.length; i += 1) {
    const productId1 = products.some((sale) => sale.id === sales[i].productId);
    if (!productId1) {
      return res.status(404).json({ message: 'Product not found' });
    }
  }
  next();
};

module.exports = {
  midProduct,
  validationName,
  productId,
  quantity,
  productFound,
  midSales,
};
