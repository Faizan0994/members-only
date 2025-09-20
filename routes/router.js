const { Router } = require("express");

const router = new Router();

// TODO: complete the routes
router.get("/");
router.get("/login");
router.post("/login");
router.get("/signup");
router.post("/signup");
router.get("/create-message");
router.post("/create-message");
router.post("/:id/delete-message");
router.get("/membership");
router.post("/membership");

module.exports = router;
