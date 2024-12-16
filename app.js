const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const PORT = 8080;

// declare users file location
const usersFile = path.join(__dirname, "./users.json");

// deceleration server (application)
const app = express();

// url , method
// general Midillware  : .use
// middlewares         : .get , .post , .put , .patch , .delete

// when use urlencoded body
// app.use(bodyParser.urlencoded({ extended: false }));

// when use raw Json Body
app.use(bodyParser.json()); // raw json

//
app.get("/", (req, res, next) => {
  res.write("<div>Welcome in Home Page!</div>");
  res.end();
});

app.get("/add-user", (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  res.write(
    `
        <form action="/users" method="POST">
        <input type="text" name="userName" />
        <input type="submit" />
        </form>
          `
  );
  res.end();
});

app.post("/users", (req, res, next) => {
  const { userName } = req.body;

  //read data from file  (string)
  const usersString = fs.readFileSync(usersFile);

  // convert string to array (parsing)
  const usersParser = JSON.parse(usersString);

  // push new element
  usersParser.push(userName);

  // reconvert totstring
  const usersArrayString = JSON.stringify(usersParser);

  // rewrite the string on file again
  fs.writeFileSync(usersFile, usersArrayString);

  res.end();
});

app.get("/users", (req, res, next) => {
  // get all users from file

  res.end();
});
//

// // exeption error
app.use((req, res, next) => {
  console.log("404 Not Found Any Routes !");
  res.status(404).end();
});

app.listen(PORT, () => console.log("App Server is running on " + PORT));
