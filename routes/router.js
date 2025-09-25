const { Router } = require("express");
const controller = require("../controllers/controller");

const router = new Router();

// TODO: complete the routes
router.get("/", controller.index);
router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);
router.get("/signup", controller.signupGet);
router.post("/signup", controller.signupPost);
router.post("/logout", controller.logoutPost);
router.get("/create-message", (req, res) => {});
router.post("/create-message", (req, res) => {});
router.post("/:id/delete-message", (req, res) => {});
router.get("/membership", (req, res) => {});
router.post("/membership", (req, res) => {});

module.exports = router;
