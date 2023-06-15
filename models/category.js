const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  itemCount: { type: Number, required: true },
});

CategorySchema.virtual("url").get(function () {
  return `/catalog/category/${this._id}`;
});
