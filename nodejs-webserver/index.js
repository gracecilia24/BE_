const http = require("http");
const { data } = require("./member");
const { users } = require("./user");

const server = http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    const url = req.url;

    if (url === "/") {
      res.write("This is home page");
    }

    if (url === "/about") {
      res.write(
        JSON.stringify({
          status: "Success",
          message: "Response success",
          description: "Exerscise #3",
          date: moment(),
          data,
        })
      );
    }

    if (url === "/user") {
      res.write(JSON.stringify(users));
    }
    res.end();
  })
  .listen(3010);