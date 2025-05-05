function indexController(req, res) {
  res.status(200).render("index");
}

function shopController(req, res) {
  res.status(200).render("shop");
}

function errorController(req, res) {
  res.status(404).render("error");
}

module.exports = { indexController, shopController, errorController };
