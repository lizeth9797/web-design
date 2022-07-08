require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const server = express();

// auth = authentication
const auth = require("./middlewares/authenticated");

server.use(express.json());

const PORT = process.env.PORT || 3000;

const Users = [
  {
    id: "27afb755-8cd7-4e02-9718-4c32a6bc705c",
    email: "iramirez@example.com",
    password: "P4$$w0rd",
    type: "admin",
  },
];

// routes
server.post("/login", (req, res) => {
  // authentication
  const email = req.body.email;
  const password = req.body.password;

  // buscar en la base de datos el usuario
  const user = Users.find((user) => user.email === email);
  // y si lo encuentro, comparar su contraseña
  if (!user) {
    return res.status(401).json({ message: "Email or password invalid" });
  }
  // si el usuario existe y la constraseña son válidos
  if (user.password !== password) {
    // user.validatePassword(password)
    return res.status(401).json({ message: "Email or password invalid*" });
  }
  // entonces el usuario está autenticado.
  // proveer token
  const payload = { userId: user.id };
  const secret = process.env.SECRET;
  const options = { expiresIn: 3600 };
  const token = jwt.sign(payload, secret, options);

  res.status(200).json({ token });
});

server.get("/protected", auth, (req, res) => {
  res.json({
    message: "Authenticated",
    userId: req.userId,
  });
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
