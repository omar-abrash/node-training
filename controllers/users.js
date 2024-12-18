const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../users.json");

const getAllUsers = (req, res, next) => {
  const usersData = fs.readFileSync(usersFile, { encoding: "utf-8" });
  const users = JSON.parse(usersData);

  res.status(200).json({ users: users });
};

const addNewUser = (req, res, next) => {
  const body = req.body;
  const userName = body.userName;

  // read users file and push new user
  const usersData = fs.readFileSync(usersFile, { encoding: "utf-8" });
  const users = JSON.parse(usersData);
  users.push(userName);

  // to store new user in users file
  const usersString = JSON.stringify(users);
  fs.writeFileSync(usersFile, usersString);

  res.status(201).json({ message: "add user name successfully!", userName });
};

module.exports = { getAllUsers, addNewUser };
