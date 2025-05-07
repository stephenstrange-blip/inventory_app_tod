const { Router } = require("express");
const {
  indexController,
  shopController,
  errorController,
  itemController,
  editGetController,
  editPostController,
} = require("../controllers/userController");

const indexRouter = new Router();

indexRouter.get("/", indexController);
indexRouter.get("/shop", shopController);
indexRouter.post("/shop/:product_id", itemController);
indexRouter.get("/shop/:product_id/edit", editGetController);
indexRouter.post("/shop/:product_id/edit", editPostController);
indexRouter.get("{*any}", errorController);

module.exports = indexRouter;
