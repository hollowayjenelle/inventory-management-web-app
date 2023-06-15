#! /usr/bin/env node

const userArgs = process.argv.slice(2);

const Item = require("../models/item");
const Category = require("../models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected");
  await createItems();
  await createCategories();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function itemCreate(
  name,
  description,
  category,
  price,
  status,
  stock_number,
  image,
  size,
  color
) {
  const itemDetails = {
    name: name,
    description: description,
    category: category,
    price: price,
    status: status,
    stock_number: stock_number,
    image: image,
    size: size,
    color: color,
  };
  const item = new Item(itemDetails);
  await item.save();
  items.push(item);
  console.log(`Added item ${name}`);
}

async function categoryCreate(name) {
  const category = new Category({ name: name });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate("Tops"),
    categoryCreate("Jeans"),
    categoryCreate("Dresses"),
  ]);
}
//finish this at home
async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      "Striped Black and White T-Shirt",
      "A black and white striped t-shirt with round neck",
      categories[0],
      20.0,
      "In Stock",
      12,
      "../public/images/striped-shirt.jpg",
      ["S", "M", "L", "XL"],
      "Black and White"
    ),
    itemCreate(
      "Black T-Shirt",
      "A plain black t-shirt with round neck",
      categories[0],
      10.0,
      "In Stock",
      20,
      "../public/images/black-tshirt.jpg",
      ["M", "L", "XL"],
      "Black"
    ),
    itemCreate(
      "Ruffled Red Dress",
      "A beautiful ruffled red dress",
      categories[2],
      24.5,
      "Almost Out Of Stock",
      5,
      "../public/images/ruffled-red-dress.jpg",
      ["M"],
      "Red"
    ),
    itemCreate(
      "Sequined Black Dress",
      "A dazzling sequined black dress",
      categories[2],
      35.5,
      "In Stock",
      10,
      "../public/images/sequined-black-dress.jpg",
      ["M", "L", "XL", "XXL"],
      "Black"
    ),
  ]);
}
