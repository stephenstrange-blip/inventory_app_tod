const { Pool } = require("pg");
const { argv } = require("node:process");
require("dotenv").config();

const DB = {
  ROLE: process.env.ROLE,
  HOST: process.env.HOST,
  PASSWORD: argv[2],
  PORT: process.env.DB_PORT,
  NAME: process.env.DATABASE,
};

const QUERIES = {
  SELECT_ALL:
    "SELECT i.product_id, p.name, c.name AS category, i.stock, i.price, i.image_uri FROM inventory AS i LEFT JOIN products as p ON i.product_id = p.id LEFT JOIN categories as c ON i.category_id = c.id",
  FILTER_BY_ID: "WHERE i.product_id = ($1)",
  UPDATE_PRODUCT:
    "UPDATE inventory SET (stock, price) = (($3), ($2)) WHERE product_id = ($1)",
};

const pool = new Pool({
  connectionString: `postgresql://${DB.ROLE}:${DB.PASSWORD}@${DB.HOST}:${DB.PORT}/${DB.NAME}`,
});

async function fetchProducts(id = null) {
  if (id && Number(id)) {
    const { rows } = await pool.query(
      QUERIES.SELECT_ALL + " " + QUERIES.FILTER_BY_ID,
      [id]
    );
    return rows;
  } else {
    const { rows } = await pool.query(QUERIES.SELECT_ALL);
    return rows;
  }
}

async function updateProduct({ id, stock, price }) {
  const isValid = !!(Number(id) && Number(price) && Number(stock));

  if (!id) throw new Error("Id not supplied!");

  if (isValid) {
    const result = await pool.query(QUERIES.UPDATE_PRODUCT, [id, price, stock]);
    return result;
  }
}

module.exports = { fetchProducts, updateProduct };
