const { Router } = require("express");
const {
  indexController,
  shopController,
  errorController,
} = require("../controllers/userController");

const indexRouter = new Router();

indexRouter.get("/", indexController);
indexRouter.get("/shop", shopController);
indexRouter.get("{*any}", errorController);

module.exports = indexRouter;
