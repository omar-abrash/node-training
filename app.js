const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = 8080;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.write(`<div> Welcome In Home Page</div>`);
  }
  //
  else if (url === "/add-user" && method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `
      <form action="/users" method="POST">      
      <input type="text" name="userName" />
      <input type="submit" />
      </form>
        `
    );
  }
  // payload // body
  else if (url === "/users" && method === "POST") {
    // req  ::> payload : body (userName=omar)
    let payload = [];

    req.on("data", (chunk) => {
      payload.push(chunk);
    });

    req.on("end", () => {
      const data = Buffer.concat(payload).toString();
      //  userName=o
      const userName = data.split("=")[1]; // [userName , o]
      // read file in this place :
      const usersFile = path.join(__dirname, "./users.json");
      const usersData = fs.readFileSync(usersFile, { encoding: "utf-8" });
      const usersParsing = JSON.parse(usersData);
      usersParsing.push(userName);
      const usersText = JSON.stringify(usersParsing);
      fs.writeFileSync(usersFile, usersText);
    });

    // res.writeHead(302, { Location: "/users" }); // 302 Found
    // return res.end();
    res.end();
  }
  //
  else if (url === "/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const usersFile = path.join(__dirname, "./users.json");
    const usersData = fs.readFileSync(usersFile, { encoding: "utf-8" });
    const users = JSON.parse(usersData);

    res.write(`${users.map((user) => `<div>${user}</div>`)}`);
  }
  // exeption error
  else {
    res.write(`<div>Error Page</div>`);
    return res.end();
  }
  return res.end();
});

server.listen(PORT, () => console.log("Server is running on PORT : " + PORT));

// CRUD Operators   create , read , update , delete

// GET ALL : GET ITEMS from System
// GET one some element (/id)

// POST: add new user   (payload => userName) ++
// PUT : modify user    (payload => userName , id )
// BATCH : change user  (payload => userName, id )
// DELETE : delete user (dynamic paramters : id )
