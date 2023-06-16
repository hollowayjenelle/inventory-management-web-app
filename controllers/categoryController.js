const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

//Displays all the categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Categories",
    categories: allCategories,
  });
});

//Display all items under the category selected
exports.category_details = asyncHandler(async (req, res, next) => {
  const [category, allItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id })
      .populate("category")
      .sort({ name: 1 })
      .exec(),
  ]);
  res.render("items_list", {
    title: `Category: ${category.name}`,
    items: allItems,
  });
});
