const express = require("express");
const { data } = require("./member");
const { users } = require("./user");
const morgan = require("morgan");

const app = express(); //express
const port = 3001;

app.use(morgan("combined")); // Menggunakan Morgan middleware untuk logging

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.get("/about", (req, res) => {
  res.json({
    status: "Success",
    message: "Response success",
    description: "Exerscise #3",
    date: moment(),
    data,
  });
});

app.get("/user", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
