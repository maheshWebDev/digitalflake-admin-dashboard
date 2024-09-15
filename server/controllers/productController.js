const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const createProduct = async (req, res) => {
  try {
    const { name, packSize, category, mrp, image, status } = req.body;

    const newProduct = await Product.create({
      productName: name,
      packSize,
      category,
      mrp,
      image,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user._id });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const {
    name: productName,
    packSize,
    category,
    mrp,
    image,
    status,
  } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      {
        productName,
        packSize,
        category,
        mrp,
        image,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
