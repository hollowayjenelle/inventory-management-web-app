const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    var filename = Date.now();
    switch (file.mimetype) {
      case "image/png":
        filename = filename + ".png";
        break;
      case "image/jpeg":
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

router.post(
  "/item/create",
  upload.single("image"),
  item_controller.items_create_post
);

router.get("/item/:id/delete", item_controller.items_delete_get);

router.post("/item/:id/delete", item_controller.items_delete_post);

router.get("/item/:id/update", item_controller.items_update_get);

router.post(
  "/item/:id/update",
  upload.single("image"),
  item_controller.items_update_post
);

router.get("/item/:id", item_controller.items_details);

router.get("/items", item_controller.items_list);

//CATEGORY ROUTES //
router.get("/category/create", category_controller.category_create_get);

router.post("/category/create", category_controller.category_create_post);

router.get("/category/:id/delete", category_controller.category_delete_get);

router.get("/categories", category_controller.category_list);

router.get("/category/:id", category_controller.category_details);

//SIZE ROUTES//
router.get("/sizes", size_controller.size_list);

router.get("/size/:id", size_controller.size_details);

module.exports = router;
