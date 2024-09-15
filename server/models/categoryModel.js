const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
