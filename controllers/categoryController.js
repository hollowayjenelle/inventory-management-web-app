const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create a Category" });
});

exports.category_create_post = [
  body("category", "Category is required").trim().isLength({ min: 3 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.category });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create a Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.category,
      }).exec();
      if (categoryExists) {
        res.redirect(category.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allItemsUnderCat] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  res.render("category_delete", {
    title: `Delete ${category.name}`,
    category: category,
    items: allItemsUnderCat,
  });
});
