const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");

router.get("/", item_controller.index);

//ITEMS ROUTES //
router.get("/items", item_controller.items_list);

router.get("/item/:id", item_controller.items_details);

module.exports = router;
