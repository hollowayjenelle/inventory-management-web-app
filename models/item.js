const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  price: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["In Stock", "Out of Stock", "Almost Out Of Stock"],
    default: "In Stock",
  },
  stock_number: { type: Number, required: true },
  image: { type: String, required: true },
  size: [{ type: Schema.Types.ObjectId, ref: "Size", required: true }],
  color: { type: String, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
