const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  name: { type: String, required: true },
});

SizeSchema.virtual("url").get(function () {
  return `/catalog/size/${this._id}`;
});

module.exports = mongoose.model("Size", SizeSchema);
