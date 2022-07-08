require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const server = express();

// body parser
server.use(express.json());

// logger
server.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// logger headers
server.use((req, res, next) => {
  console.log("Request Headers", JSON.stringify(req.headers, null, 4));
  next();
});

server.use((req, res, next) => {
  if (req.get("PeT-TyPe") === "Cat") {
    res.send("Miau!");
    return;
  } else if (req.get("PET-TYPE") === "Dog") {
    res.send("Woof!");
    return;
  }
  next();
});

server.get("/api/users", (req, res) => {
  res.json({
    users: 20,
  });
});

server.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("body->", body);
  // create a user
  res.json({
    user: {
      id: Date.now(),
      ...body,
    },
  });
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    user: {
      id: userId,
      name: "Isaac",
      email: "iramirez@example.com",
    },
  });
});

// post
// return id from params
// req.body

// patch
// return id from params
// req.body

// delete
// return id from params
// hardcoded body

// 404 handler
server.use((req, res) => {
  res.send("Welcome");
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
