const http = require("http");
const PORT = 8080;

const users = []; // datebase

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.write(`<div> Welcome In Home Page</div>`);
  }

  if (url === "/add-user" && method === "GET") {
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
  if (url === "/users" && method === "POST") {
    // req  ::> payload : body (userName=omar)
    let payload = [];

    req.on("data", (chunk) => {
      payload.push(chunk);
    });

    req.on("end", () => {
      const data = Buffer.concat(payload).toString();
      //  userName=o
      const userName = data.split("=")[1]; // [userName , o]
      users.push(userName);
      res.end();
    });

    //
    res.write(`<div>In this Locatio will add new User to Users</div>`);
  }

  if (url === "/users" && method === "GET") {
    res.write(`${users.map((user) => `<div>${user}</div>`)}`);
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
