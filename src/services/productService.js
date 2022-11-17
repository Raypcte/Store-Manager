const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const dados = await productModel.getAllProducts();
  if (dados) {
    return dados;
  }
}; 

const getProductFromID = async (id) => {
  const dados = await productModel.getProductFromID(id);
  if (dados) {
    return dados;
  }
};

module.exports = {
  getAllProducts,
  getProductFromID,
};