const { Router } = require("express");
const {
  indexController,
  shopController,
  errorController,
  itemController,
} = require("../controllers/userController");

const indexRouter = new Router();

indexRouter.get("/", indexController);
indexRouter.get("/shop", shopController);
indexRouter.post("/shop/:product_id", itemController);
indexRouter.get("{*any}", errorController);

module.exports = indexRouter;
