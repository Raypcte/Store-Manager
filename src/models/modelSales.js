const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(`
  SELECT * FROM sales AS s1
  INNER JOIN sales_products AS s2
  ON s1.id = s2.sale_id
  `);
  return result.map((sale) => ({
    saleId: sale.sale_id,
    productId: sale.product_id,
    quantity: sale.quantity,
    date: sale.date,
  }));
};

const getSalesFromID = async (id) => {
  const [result] = await connection.execute(
    `
    SELECT * FROM sales AS s1
    INNER JOIN sales_products AS s2
    ON s1.id = s2.sale_id
    WHERE id = ?
    `,
    [id],
  );
  return result.map((sale) => ({
    productId: sale.product_id,
    quantity: sale.quantity,
    date: sale.date,
  }));
};

const createSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) Values (NOW())',
  );

  sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products(sale_id, product_id, quantity) Values (?, ?, ?)',
      [insertId, productId, quantity],
    );
    // oi
  });

  return {
    id: insertId,
    itemsSold: sales,
  };
};

module.exports = {
  createSales,
  getAllSales,
  getSalesFromID,
};
