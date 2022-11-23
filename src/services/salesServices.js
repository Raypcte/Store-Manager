const modelSales = require('../models/modelSales');

const createSales = async (products) => {
  const sales = await modelSales.createSales(products);

  return sales;
};

module.exports = {
  createSales,
};
