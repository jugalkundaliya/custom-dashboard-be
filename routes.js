const express = require("express");
const { signUp, signIn, getUsers } = require("./controllers/authController");
const { verifyAdmin, verifyAuthenticated } = require("./middlewares/auth");
const { getDashboardData } = require("./controllers/dashboardController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.get("/dashboard", verifyAuthenticated, getDashboardData);

router.get("/admin", verifyAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin" });
});
router.get("/users", verifyAdmin, getUsers);

module.exports = router;
