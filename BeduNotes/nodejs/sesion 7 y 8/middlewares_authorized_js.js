// esto no debería estar aquí, pero por efectos practicos
// lo pondremos.
// Notese que el password no está cifrado. Los usuarios se
// deben obtener del Modelo directamente.
const Users = [
  {
    id: "27afb755-8cd7-4e02-9718-4c32a6bc705c",
    email: "iramirez@example.com",
    password: "P4$$w0rd",
    type: "guest",
  },
];

module.exports =
  (...roles) =>
  (req, res, next) => {
    // authorization.
    const userId = req.userId;
    const user = Users.find((user) => user.id === userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    // si el usuario tiene permisos para ver este recurso
    if (!roles.includes(user.type)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  };
