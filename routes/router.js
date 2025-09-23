const { Router } = require("express");

const router = new Router();

// TODO: complete the routes
router.get("/", (req, res) => {
  res.redirect("/login"); // temporary
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", (req, res) => {});
router.get("/create-message", (req, res) => {});
router.post("/create-message", (req, res) => {});
router.post("/:id/delete-message", (req, res) => {});
router.get("/membership", (req, res) => {});
router.post("/membership", (req, res) => {});

module.exports = router;
