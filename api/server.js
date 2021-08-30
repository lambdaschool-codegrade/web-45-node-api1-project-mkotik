// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const userFunctions = require("./users/model.js");
module.exports = server; // EXPORT YOUR SERVER instead of {}

server.use(express.json());

server.post("/api/users", (req, res) => {
  const input = req.body;
  if (!input.name || !input.bio) {
    res.status(400).json({
      message: "provide name and bio ",
    });
  } else {
    userFunctions
      .insert(input)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
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

server.get("*", (req, res) => {
  res.status(404).send("endpoint not found");
});
