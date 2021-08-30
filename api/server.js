// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const userFunctions = require("./users/model.js");
module.exports = server; // EXPORT YOUR SERVER instead of {}

server.post("/api/users", () => {
  console.log("create a user");
});

server.get("/api/users", async (req, res) => {
  userFunctions
    .find()
    .then((users) => {
      //   console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      //   console.log(err);
      res.status(500).json({ message: err.message });
    });
});

server.get("/api/users/:id", () => {
  console.log("returns user with id");
});

server.delete("api/users/:id", (res, req) => {
  console.log("deletes a user with id");
});

server.put("api/users/:id", () => {
  console.log("updates a user with id");
});
