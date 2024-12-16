const express = require("express");
const PORT = 8080;

// deceleration server (application)
const app = express();

// url , method
// general Midillware  : .use
// middlewares         : .get , .post , .put , .patch , .delete

app.get("/", (req, res, next) => {
  res.write("<div>Welcome in Home Page!</div>");
  res.end();
});

// exeption error
app.use((req, res, next) => {
  console.log("Not Found Any Routes !");
  res.end();
});

app.listen(PORT, () => console.log("App Server is running on " + PORT));
