const passport = require("passport");
const pool = require("../database/pool");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

function isAuthenticated(req, res, next) {
  // Not currently in use
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

const validator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Please enter a name")
    .isLength({ min: 3, max: 50 })
    .withMessage("The name length must be between 3 and 50 characters")
    .matches(/^[A-Za-z\s]+$/) // Only letters and spaces
    .withMessage("Name must contain only letters and spaces"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Enter a username")
    .isLength({ max: 50 })
    .withMessage("username must be less than 50 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Enter a password")
    .isLength({ max: 64 })
    .withMessage("password must be less than 64 characters"),
  body("confirm")
    .trim()
    .notEmpty()
    .withMessage("Enter password again")
    .isLength({ max: 64 })
    .withMessage("password must be less than 64 characters")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

exports.signupPost = [
  validator,
  async (req, res) => {
    const { name, username, password, confirm } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("signup", {
        name: name,
        username: username,
        password: password,
        confirm: confirm,
        errors: errors.array(),
      });
    }

    try {
      await pool.query(
        "INSERT INTO users (name, username, password, member, admin) values ($1, $2, $3, $4, $5)",
        [name, username, hashedPassword, false, false]
      );
      res.redirect("/login");
    } catch (err) {
      res.status(500).send("an error occured");
    }
  },
];

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
  res.render("signup", {
    name: null,
    username: null,
    password: null,
    confirm: null,
    errors: null,
  });
};

exports.loginGet = (req, res) => {
  res.render("login");
};
