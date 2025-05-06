const { Pool } = require("pg");
require("dotenv").config();
const { fetchProducts } = require("../db/db");

const USER = {
  ROLE: process.env,
};

const QUERIES = {
  SELECT_ALL:
    "SELECT i.product_id, p.name, c.name, i.stock, i.price FROM inventory AS i LEFT JOIN products as p ON i.product_id = p.id LEFT JOIN categories as c ON i.category_id = c.id",
};

function indexController(req, res) {
  res.status(200).render("index");
}

async function shopController(req, res) {
  try {
    const row = await fetchProducts();
    console.log(row);
    res.status(200).render("shop", { products: row });
  } catch (err) {
    console.log(err);
    res.status(404).render("error");
  }
}

async function itemController(req, res) {
  try {
    const { product_id } = req.params;
    const row = await fetchProducts(product_id);
    console.log(product_id, row);
    res.status(200).render("item", { product: row[0] });
  } catch (err) {
    console.log(err);
    res.status(404).render("error");
  }
}

function errorController(req, res) {
  res.status(404).render("error");
}

module.exports = {
  indexController,
  shopController,
  errorController,
  itemController,
};
