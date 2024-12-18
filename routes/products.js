const express = require("express");
const productsRouter = express.Router();

// "/products"
productsRouter.get("/", (req, res, next) => {
  console.log("get all Products");
  res.end();
});

// "/products/add-to-product"
productsRouter.post("/add-to-product", (req, res, next) => {
  console.log("post product to products");
  res.end();
});

module.exports = { productsRouter };
