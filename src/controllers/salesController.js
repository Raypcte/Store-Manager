const salesServices = require('../services/salesServices');

const createSales = async (req, res) => {
  const products = req.body;
  const sales = await salesServices.createSales(products);
  if (sales) return res.status(201).json(sales);
};

module.exports = {
  createSales,
};
