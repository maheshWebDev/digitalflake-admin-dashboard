const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticateUser = require("../middleware/authMiddleware");

// Category routes
router.post("/categories", authenticateUser, createCategory);
router.get("/categories", authenticateUser, getCategories);
router.put("/categories/:id", authenticateUser, updateCategory);
router.delete("/categories/:id", authenticateUser, deleteCategory);

module.exports = router;
