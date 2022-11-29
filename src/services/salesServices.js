const modelSales = require('../models/modelSales');

const getAllSales = async () => {
  const dados = await modelSales.getAllSales();
  if (dados.length) return dados;
  return [];
};

const getSalesFromID = async (id) => {
  const dados = await modelSales.getSalesFromID(id);
  if (dados.length) return dados;
  return [];
};

const createSales = async (products) => {
  const sales = await modelSales.createSales(products);
  return sales;
};

module.exports = {
  createSales,
  getAllSales,
  getSalesFromID,
};
