const { Pool } = require("pg");
require("dotenv").config();
const { fetchProducts, updateProduct } = require("../db/db");

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
    // console.log(row);
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
    res.status(200).render("item", { product: row[0] });
  } catch (err) {
    console.log(err);
    res.status(404).render("error");
  }
}

async function editGetController(req, res) {
  try {
    const { product_id } = req.params;
    const row = await fetchProducts(product_id);
    res.status(200).render("edit", { product: row[0] });
  } catch (err) {
    console.log(err);
    res.status(404).render("error");
  }
}

async function editPostController(req, res) {
  try {
    const { product_id } = req.params;
    const { product_price, product_stock } = req.body;

    const result = await updateProduct({
      id: product_id,
      price: product_price,
      stock: product_stock,
    });

    res.status(200).redirect("/shop");
  } catch (err) {
    console.log(err);
    res.status(404).redirect("/shop");
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
  editGetController,
  editPostController,
};
