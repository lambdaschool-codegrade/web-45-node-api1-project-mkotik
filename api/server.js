// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
module.exports = server; // EXPORT YOUR SERVER instead of {}

server.get("/", (req, res) => {
  console.log("hey");
  res.status(200).json("hello");
});
