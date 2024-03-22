const jwt = require("jsonwebtoken");

// Authenticates based on JWT verification
const authenticateUser = (req, res) => {
  const bearer = req.headers.authorization;
  const token = bearer.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      res.status(200).json({ message: "User authenticated", id: decoded.id });
    }
  });
};

module.exports = { authenticateUser };
