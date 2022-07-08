require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3000;
const server = express();

server.use((req, res) => {
  res.send("Welcome");
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
