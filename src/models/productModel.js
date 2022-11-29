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

const updateProductFromID = async (id, { name }) => {
  await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );
};

const insertProducts = async ({ name }) => {
  await connection
    .execute('INSERT INTO products (name) VALUES (?)', [name]);
  return name;
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
  updateProductFromID,
};