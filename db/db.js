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
    "SELECT i.product_id, p.name, c.name AS category, i.stock, i.price FROM inventory AS i LEFT JOIN products as p ON i.product_id = p.id LEFT JOIN categories as c ON i.category_id = c.id",
};

const pool = new Pool({
  connectionString: `postgresql://${DB.ROLE}:${DB.PASSWORD}@${DB.HOST}:${DB.PORT}/${DB.NAME}`,
});

async function fetchProducts() {
  const { rows } = await pool.query(QUERIES.SELECT_ALL);
  return rows;
}

module.exports = { fetchProducts };
