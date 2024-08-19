// backend/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Added custom error message
      trim: true, // Trim whitespace from the name
    },
    description: {
      type: String,
      required: [true, "Description is required"], // Added custom error message
      trim: true, // Trim whitespace from the description
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
