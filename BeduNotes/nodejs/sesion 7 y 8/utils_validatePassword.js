const bcrypt = require("bcrypt");

module.exports = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
