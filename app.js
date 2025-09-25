const express = require("express");
const path = require("path");
const router = require("./routes/router");
require("dotenv").config();
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./database/pool");
const passport = require("passport");
const passportInit = require("./auth/passport");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Express session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    },
    store: new pgSession({
      pool: pool,
      tableName: "sessions",
      createTableIfMissing: true,
    }),
  })
);

passportInit(passport);
app.use(passport.session());

app.use(router);

app.listen(3000, (error) => {
  if (error) throw error;
});
