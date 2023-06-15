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
    categoryCreate("Skirts"),
  ]);
}
//finish this at home
async function createItems() {
  console.log("Adding items");
  await Promise.all([itemCreate("")]);
}
