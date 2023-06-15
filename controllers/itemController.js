const Item = require("./models/item");
const Category = require("./models/category");
const asyncHandler = require("express-async-handler");

//Gets all items - no matter the category
exports.items_list = asyncHandler(async (req, res, next) => {
  const allItems = Item.find().sort({ name: 1 }).populate("category").exec();
  res.render("items_list", { title: "All Items", items: allItems });
});
