#! /usr/bin/env node
const mongoose = require("mongoose");

const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");
const Size = require("./models/size");

const items = [];
const categories = [];
const sizes = [];

mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected");
  await createCategories();
  await createSizes();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function itemCreate(
  name,
  description,
  category,
  price,
  status,
  image,
  sizes,
  color
) {
  const itemDetails = {
    name: name,
    description: description,
    category: category,
    price: price,
    status: status,
    image: image,
    sizes: sizes,
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

async function sizeCreate(name) {
  const size = new Size({ name: name });
  await size.save();
  sizes.push(size);
  console.log(`Added size: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate("Tops"),
    categoryCreate("Jeans"),
    categoryCreate("Dresses"),
  ]);
}

async function createSizes() {
  console.log("Adding sizes");
  await Promise.all([
    sizeCreate("XS"),
    sizeCreate("S"),
    sizeCreate("M"),
    sizeCreate("L"),
    sizeCreate("XL"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      "Striped Black and White T-Shirt",
      "A black and white striped t-shirt with round neck",
      categories[0],
      20.0,
      "In Stock",
      "./public/images/striped-shirt.jpg",
      [
        { size: sizes[1], quantity: 10 },
        { size: sizes[2], quantity: 5 },
        { size: sizes[3], quantity: 12 },
      ],
      "Black and White"
    ),
    itemCreate(
      "Black T-Shirt",
      "A plain black t-shirt with round neck",
      categories[0],
      10.0,
      "In Stock",
      "./public/images/black-tshirt.jpg",
      [
        { size: sizes[2], quantity: 12 },
        { size: sizes[3], quantity: 10 },
        { size: sizes[4], quantity: 10 },
      ],
      "Black"
    ),
    itemCreate(
      "Ruffled Red Dress",
      "A beautiful ruffled red dress",
      categories[2],
      24.5,
      "Almost Out Of Stock",
      "./public/images/ruffled-red-dress.jpg",
      [{ size: sizes[2], quantity: 5 }],
      "Red"
    ),
    itemCreate(
      "Sequined Black Dress",
      "A dazzling sequined black dress",
      categories[2],
      35.5,
      "In Stock",
      "./public/images/sequined-black-dress.jpg",
      [
        { size: sizes[1], quantity: 15 },
        { size: sizes[2], quantity: 10 },
        { size: sizes[3], quantity: 15 },
      ],
      "Black"
    ),
  ]);
}
