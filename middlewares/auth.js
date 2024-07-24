const cognito = require("../aws-config");

// Middleware to verify authenticated user
const verifyAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  cognito.getUser({ AccessToken: token }, (err, data) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
};

// Middleware to verify Admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  cognito.getUser({ AccessToken: token }, (err, data) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const adminGroup = data.UserAttributes.find(
      (attr) => attr.Name === "profile" && attr.Value === "admin"
    );
    if (adminGroup) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  });
};

module.exports = { verifyAdmin, verifyAuthenticated };
