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
      message: "Please provide name and bio for the user",
    });
  } else {
    userFunctions
      .insert(input)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

server.get("/api/users", async (req, res) => {
  userFunctions
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userFunctions
    .findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userFunctions
    .remove(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    userFunctions
      .update(id, changes)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  }
});

server.get("*", (req, res) => {
  res.status(404).send("endpoint not found");
});
