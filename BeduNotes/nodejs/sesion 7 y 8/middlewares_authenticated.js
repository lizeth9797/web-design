const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.get("authorization");
  console.log("auth->", auth);
  const token = auth.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("decoded", decoded);

    req.userId = decoded.userId;

    next();
  });
};
