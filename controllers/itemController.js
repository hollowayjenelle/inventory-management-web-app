const Item = require("../models/item");
const Category = require("../models/category");
const Size = require("../models/size");
const asyncHandler = require("express-async-handler");
const { body, validationResults } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Jen's Jemme Inventory" });
});

//Gets all items - no matter the category
exports.items_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find()
    .sort({ name: 1 })
    .populate("category")
    .exec();
  res.render("items_list", { title: "All Items", items: allItems });
});

//Get item details
exports.items_details = asyncHandler(async (req, res, next) => {
  const item = await Item.find(req.params.id)
    .populate("category")
    .populate("size")
    .exec();
  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    next(err);
  }

  res.render("item_detail", { title: item.name, item: item });
});

/*Create item form - get
exports.items_create_get = asyncHandler(async (req, res, next) => {
  const allCategory = Category.find().sort({ name: 1 }).exec();
  res.render("item_form", { title: "Create Item", categories: allCategory });
});

exports.items_create_post = [
  body("name", "Item name is required").trim().isLength({ min: 3 }).escape(),
  body("description", "Item description is required")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category.*").escape(),
  body("price", "Price is required").trim().isNumeric().escape(),
  body("status").escape(),
  body("stock_number", "Stock number is required").trim().isNumeric().escape(),
];*/
