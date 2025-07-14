const express = require("express");
const router = express.Router();
const blogController = require("../app/controllers/BlogController");

// newsController.index;

router.get("/trash-blogs", blogController.trashBlogs);
router.get("/management", blogController.management);
router.get("/create", blogController.create);
router.post("/store", blogController.store);
router.put("/update/:id", blogController.update);
router.patch("/restore/:id", blogController.restoreBlog);
router.delete("/deletes", blogController.deletes);
router.delete("/delete/:id", blogController.delete);
router.delete("/delete-force/:id", blogController.deleteForceBlog);
router.get("/:id/edit", blogController.edit);
router.get("/:slug", blogController.detail);
router.get("/", blogController.index);

module.exports = router;
