const Size = require("../models/size");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.size_list = asyncHandler(async (req, res, next) => {
  const allSizes = await Size.find().exec();
  const customOrder = ["XS", "S", "M", "L", "XL"];
  allSizes.sort(function (a, b) {
    return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
  });
  res.render("size_list", { title: "All Sizes", sizes: allSizes });
});

exports.size_details = asyncHandler(async (req, res, next) => {
  const [size, clothesInCurrentSize] = await Promise.all([
    Size.findById(req.params.id),
    Item.find({ "sizes.size": req.params.id }),
  ]);
  res.render("items_list", {
    title: `Clothes in size ${size.name}`,
    items: clothesInCurrentSize,
  });
});
