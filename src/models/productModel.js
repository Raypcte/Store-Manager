const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection
    .execute('SELECT * FROM products');
  return result;
};

const getProductFromID = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const insertProducts = async ({ name }) => {
  await connection
    .execute('INSERT INTO products (name) VALUES (?)', [name]);
};

const productInserteds = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id DESC LIMIT 1',
  );
  return result;
};

module.exports = {
  getAllProducts,
  getProductFromID,
  insertProducts,
  productInserteds,
};