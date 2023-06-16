const Size = require("../models/size");
const asyncHandler = require("express-async-handler");

exports.size_list = asyncHandler(async (req, res, next) => {
  const allSizes = Size.find();
});
