const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const dados = await productModel.getAllProducts();
  if (dados) return dados;
  return [];
}; 

const getProductFromID = async (id) => {
  const dados = await productModel.getProductFromID(id);
  if (dados) return dados;
  return [];
};

const updateProductFromID = async (id, newProduct) => {
  await productModel.updateProductFromID(id, newProduct);
};

const insertProducts = async (product) => {
  await productModel.insertProducts(product);
  const newProduct = await productModel.productInserteds(product);

  if (newProduct) return newProduct[0];
  return [];
};

module.exports = {
  getAllProducts,
  getProductFromID,
  insertProducts,
  updateProductFromID,
};