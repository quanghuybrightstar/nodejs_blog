const express = require("express");
const router = express.Router();
const blogController = require("../app/controllers/BlogController");

// newsController.index;

router.get("/create", blogController.create);
router.post("/store", blogController.store);
router.get("/:slug", blogController.detail);
router.get("/", blogController.index);

module.exports = router;
