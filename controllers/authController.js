const cognito = require("../aws-config");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();
const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    await autoConfirmUser(email);
    const data = await cognito.signUp(params).promise();
    // cognito.confirmSignUp()
    user = new User({
      name: username,
      email,
    });
    await user.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sign in function
const signIn = async (req, res) => {
  const { password, email, username } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const data = await cognito.initiateAuth(params).promise();
    res.status(200).json(data);
  } catch (err) {
    console.log({ err });
    res.status(500).json(err);
  }
};

// Get User Table
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { signUp, signIn, getUsers };
