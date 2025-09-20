const express = require("express");
const path = require("path");
const router = require("./routes/router");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("view engine", "ejs");
app.use("views", path.join(__dirname, "views"));
app.use(router);

app.listen(3000, (error) => {
  if (error) throw error;
});
