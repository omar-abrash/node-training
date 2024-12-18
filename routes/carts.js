const express = require("express");
const cartsRouter = express.Router();

// "/carts"
cartsRouter.get("/", (req, res, next) => {
  console.log("get all carts");
  res.end();
});

// "/carts/add-to-cart"
cartsRouter.post("/add-to-cart", (req, res, next) => {
  console.log("post product to card");
  res.end();
});

module.exports = { cartsRouter };
