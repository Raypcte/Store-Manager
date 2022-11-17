 const productModel = require('../models/productModel');

 const midProduct = async (req, res, next) => {
  const { id } = req.params;
  const dados = await productModel.getProductFromID(id);

  if (!dados.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  midProduct,
};