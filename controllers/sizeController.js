const Size = require("../models/size");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.size_list = asyncHandler(async (req, res, next) => {
  const allSizes = await Size.find().exec();
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

exports.size_create_get = asyncHandler(async (req, res, next) => {
  res.render("size_form", { title: "Create a new size" });
});

exports.size_create_post = [
  body("size", "Size is required").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const size = new Size({
      name: req.body.size,
    });

    if (!errors.isEmpty()) {
      res.render("size_form", {
        title: "Create a new size",
        size: size,
        errors: errors.array(),
      });
    } else {
      await size.save();
      res.redirect(size.url);
    }
  }),
];

exports.size_delete_get = asyncHandler(async (req, res, next) => {
  const [size, allItems] = await Promise.all([
    Size.findById(req.params.id).exec(),
    Item.find({ "sizes.size": req.params.id }).exec(),
  ]);

  res.render("size_delete", {
    title: "Delete Size",
    size: size,
    items: allItems,
  });
});

exports.size_delete_post = asyncHandler(async (req, res, next) => {
  const size = await Size.findById(req.params.id);
  if (size === null) {
    const error = new Error("Size does not exist");
    error.status = 404;
    next(error);
  } else {
    await Size.findByIdAndRemove(req.params.id);
    res.redirect("/catalog/sizes");
  }
});
