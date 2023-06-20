const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb){
    var filename = Date.now();
    switch (file.mimetype) {
      case 'image/png':
      filename = filename + ".png";
      break;
      case 'image/jpeg':
      filename = filename + ".jpeg";
      break;
      default:
      break;
    }
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");
const size_controller = require("../controllers/sizeController");

router.get("/", item_controller.index);

//ITEMS ROUTES //
router.get("/item/create", item_controller.items_create_get);

router.get("/item/:id", item_controller.items_details);

router.get("/items", item_controller.items_list);

router.post(
  "/item/create",
  upload.single("image"),
  item_controller.items_create_post
);

//CATEGORY ROUTES //
router.get("/categories", category_controller.category_list);

router.get("/category/:id", category_controller.category_details);

//SIZE ROUTES//
router.get("/sizes", size_controller.size_list);

router.get("/size/:id", size_controller.size_details);

module.exports = router;
