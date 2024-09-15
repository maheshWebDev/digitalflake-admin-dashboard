const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authenticateUser = require("../middleware/authMiddleware");

// Product routes
router.post("/products", authenticateUser, createProduct);
router.get("/products", authenticateUser, getProducts);
router.put("/products/:id", authenticateUser, updateProduct);
router.delete("/products/:id", authenticateUser, deleteProduct);

module.exports = router;
