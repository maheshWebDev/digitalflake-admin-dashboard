const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    packSize: {
      type: String,
    },
    category: {
      type: String,
    },
    mrp: {
      type: Number,
    },
    image: {
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

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
