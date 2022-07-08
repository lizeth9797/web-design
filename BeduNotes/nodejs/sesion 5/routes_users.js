var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get("/", function (req, res) {
  const users = db.models.Users.findMany();
  res.send({ usuarios: users });
});

module.exports = router;
