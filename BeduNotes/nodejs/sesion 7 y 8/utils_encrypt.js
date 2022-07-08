const bcrypt = require("bcrypt");

module.exports = (data) => {
  const salt = bcrypt.genSaltSync();
  console.log("salt->", salt);
  return bcrypt.hashSync(data, salt);
};
