const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  image: { type: String },
  sizes: [
    {
      size: { type: Schema.Types.ObjectId, ref: "Size", required: true },
      quantity: { type: Number, required: true, default: 0 },
    },
  ],
  color: { type: String, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

ItemSchema.virtual("total_stock_number").get(function () {
  let total = 0;
  for (const size of this.sizes) {
    if (size.quantity && typeof size.quantity === "number") {
      total += size.quantity;
    }
  }
  return total;
});

ItemSchema.virtual("status").get(function () {
  let status = "";
  if (this.total_stock_number > 10) {
    status = "In Stock";
  } else if (this.total_stock_number <= 10) {
    status = "Almost Out of Stock";
  } else {
    status = "Out of Stock";
  }
  return status;
});

module.exports = mongoose.model("Item", ItemSchema);
