import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  inStock: { type: Boolean, default: true },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
