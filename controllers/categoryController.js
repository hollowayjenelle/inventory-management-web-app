const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Categories",
    categories: allCategories,
  });
});
