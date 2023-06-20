const Item = require("../models/item");
const Category = require("../models/category");
const Size = require("../models/size");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Jen's Jemme Inventory" });
});

//Gets all items - no matter the category
exports.items_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find().sort({ name: 1 }).exec();
  res.render("items_list", { title: "All Items", items: allItems });
});

//Get item details
exports.items_details = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate("category")
    .populate("sizes.size")
    .exec();
  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    next(err);
  }

  res.render("item_detail", { title: item.name, item: item });
});

exports.items_create_get = asyncHandler(async (req, res, next) => {
  const [allCategory, allSizes] = await Promise.all([
    Category.find().exec(),
    Size.find().exec(),
  ]);
  const customOrder = ["XS", "S", "M", "L", "XL"];
  allSizes.sort(function (a, b) {
    return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
  });
  res.render("item_form", {
    title: "Create Item",
    categories: allCategory,
    sizes: allSizes,
  });
});

exports.items_create_post = [
  (req, res, next) => {
    const sizes = [];
    for (const size of req.body.size) {
      const index = req.body.size.indexOf(size);
      const quantity = req.body["size-quantity"][index];
      if (quantity != "") {
        const sizeObj = { size: size, quantity: parseInt(quantity) };
        sizes.push(sizeObj);
      }
    }
    req.body.size = sizes;
    next();
  },

  //Validate and santitize data
  body("name", "Item name is required").trim().isLength({ min: 3 }).escape(),
  body("description", "Item description is required")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category", "Category is required").escape(),
  body("price", "Price is required").trim().isFloat().escape(),
  body("color", "Item color is required").trim().isLength({ min: 3 }).escape(),

  //Process request
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      image: req.file.path,
      sizes: req.body.size,
      color: req.body.color,
    });

    if (!errors.isEmpty()) {
      //If there are errors, the form will render again with the errors
      const [allCategories, allSizes] = await Promise.all([
        Category.find().exec(),
        Size.find().exec(),
      ]);

      res.render("item_form", {
        title: "Create Item",
        categories: allCategories,
        sizes: allSizes,
        item: item,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];
