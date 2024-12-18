const exprees = require("express");
const bodyParser = require("body-parser");
const PORT = 8080;

const { usersRouter } = require("./routes/users");
const { cartsRouter } = require("./routes/carts");
const { productsRouter } = require("./routes/products");

const app = exprees();

app.use(bodyParser.json());

// users , carts , products
app.use("/users", usersRouter);

app.use("/carts", cartsRouter);

app.use("/products", productsRouter);

app.use((req, res, next) => {
  console.log("404 Error NOT FOUND PAGE");
  res.end();
});

app.listen(PORT, () => console.log("Server is running on : " + PORT));
