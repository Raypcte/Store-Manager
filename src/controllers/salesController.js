const salesServices = require('../services/salesServices');

const getSales = async (_req, res) => {
  const dados = await salesServices.getAllSales();
  return res.status(200).json(dados);
};

const getSalesByID = async (req, res) => {
  const { id } = req.params;
  const dados = await salesServices.getSalesFromID(id);
  return res.status(200).json(dados);
};

const createSales = async (req, res) => {
  const products = req.body;
  const sales = await salesServices.createSales(products);
  console.log(sales, 'vendas criadas');
  return res.status(201).json(sales);
};

module.exports = {
  createSales,
  getSales,
  getSalesByID,
};
