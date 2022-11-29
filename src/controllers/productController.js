const productsServ = require('../services/productService');

const getProducts = async (_req, res) => {
  const dados = await productsServ.getAllProducts();
  return res.status(200).json(dados);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const dados = await productsServ.getProductFromID(id);
  return res.status(200).json(dados[0]);
};

const updateProductsById = async (req, res) => {
  const newProduct = req.body;
  const { id } = req.params;
  if (!newProduct.name) {
    return res.status(400).json({
      message: '"name" is required',
    });
  }
  if (newProduct.name.length < 5) {
    return res.status(422).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
  await productsServ.updateProductFromID(id, newProduct);
  return res.status(200).json({
    ...newProduct, id,
  });
};

const createNewProducts = async (req, res) => {
  const newProduct = req.body;
  const response = await productsServ.insertProducts(newProduct);
  return res.status(201).json(response);
};

module.exports = {
  getProducts,
  getProductsById,
  createNewProducts,
  updateProductsById,
};