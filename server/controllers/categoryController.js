const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name: categoryName, description, status } = req.body;

    // Create new category associated with the user
    const newCategory = await Category.create({
      categoryName,
      description: description || "",
      status,
      createdBy: req.user._id,
    });

    // Respond with the created category
    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ createdBy: req.user._id });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  const { categoryName, description, status } = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      {
        categoryName,
        description,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
