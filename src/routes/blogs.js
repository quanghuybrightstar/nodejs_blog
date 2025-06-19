const express = require("express");
const router = express.Router();
const blogController = require("../app/controllers/BlogController");

// newsController.index;

router.get("/management", blogController.management);
router.get("/create", blogController.create);
router.post("/store", blogController.store);
router.put("/update/:id", blogController.update);
router.delete("/delete/:id", blogController.delete);
router.get("/:id/edit", blogController.edit);
router.get("/:slug", blogController.detail);
router.get("/", blogController.index);

module.exports = router;
