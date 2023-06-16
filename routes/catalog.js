const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");

router.get("/", item_controller.index);

//ITEMS ROUTES //
router.get("/items", item_controller.items_list);

router.get("/item/:id", item_controller.items_details);

//CATEGORY ROUTES //
router.get("/categories", category_controller.category_list);

module.exports = router;
