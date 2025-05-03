const path = require("node:path");
const indexRouter = require("./routes/route");
const express = require("express");
const app = express();

require("dotenv").config();

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
  console.log(`Click http://${process.env.HOST}:${PORT}`);
});
