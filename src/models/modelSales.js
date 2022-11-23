const connection = require('./connection');

const createSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) Values (NOW())',
  );

  sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products(sale_id, product_id, quantity) Values (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });

  return {
    id: insertId,
    itemsSold: sales,
  };
};

module.exports = {
  createSales,
};
