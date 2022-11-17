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

module.exports = {
  getProducts,
  getProductsById,
};