// NodeJs
const http = require("node:http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/hello" && method === "GET") {
    res.write("Hello World!");
    return res.end();
  }

  if (url === "/users" && method === "GET") {
    res.write("omar , hamzeh , abdullah , osama , rama , tasneem");
    return res.end();
  }

  return res.end();
});

server.listen(8080, () => console.log("server is running on PORT:8080"));
