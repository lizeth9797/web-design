require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const server = express();

// logger
server.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// logger headers
server.use((req, res, next) => {
  console.log("Headers", JSON.stringify(req.headers, null, 4));
  next();
});

server.get("/api/users", (req, res) => {
  res.json({
    users: 20,
  });
});

server.use((req, res) => {
  res.send("Welcome");
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
