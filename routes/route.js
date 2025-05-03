const { Router } = require("express");

const indexRouter = new Router();

indexRouter.get("/", (req, res) => res.status(200).send("Initial"));

module.exports = indexRouter;
