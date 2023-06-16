const express = require("express");
const router = express.Router();

const item_contoller = require("../controllers/itemController");

router.get("/", (req, res, next) => {
  res.redirect("catalog_home");
});

//ITEMS ROUTES //
router.get("/items", item_controller.items_list);

router.get("/item/:id", item_contoller.items_details);
