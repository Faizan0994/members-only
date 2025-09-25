const passport = require("passport");
const pool = require("../database/pool");
const bcrypt = require("bcryptjs");

function isAuthenticated(req, res, next) {
  // Not currently in use
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

exports.signupPost = async (req, res) => {
  const { name, username, password, member, admin } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO users (name, username, password, member, admin) values ($1, $2, $3, $4, $5)",
      [name, username, hashedPassword, false, false]
    );
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("an error occured");
  }
};

exports.loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

exports.index = (req, res) => {
  res.render("index", { user: req.user });
};

exports.logoutPost = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.signupGet = (req, res) => {
  res.render("signup");
};

exports.loginGet = (req, res) => {
  res.render("login");
};
