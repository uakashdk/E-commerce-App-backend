import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    imageUrl: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);