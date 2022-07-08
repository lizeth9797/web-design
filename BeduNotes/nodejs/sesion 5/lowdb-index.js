const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const createModel = require("./models");

const adapter = new FileSync(__dirname + "/db.json");
const db = low(adapter);

db.defaults({ users: [] });

module.exports = {
  models: {
    Users: createModel(db, "users"),
  },
  db,
};
