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

const insertProducts = async (product) => {
  await productModel.insertProducts(product);
  const newProduct = await productModel.productInserteds(product);
  console.log(newProduct, 'novo');

  if (newProduct) return newProduct[0];
};

module.exports = {
  getAllProducts,
  getProductFromID,
  insertProducts,
};