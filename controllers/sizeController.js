const Size = require("../models/size");
const asyncHandler = require("express-async-handler");

exports.size_list = asyncHandler(async (req, res, next) => {
  const allSizes = await Size.find().exec();
  const customOrder = ["XS", "S", "M", "L", "XL"];
  allSizes.sort(function (a, b) {
    return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
  });
  res.render("size_list", { title: "All Sizes", sizes: allSizes });
});
