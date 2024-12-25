const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Register Controller
const registerUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { registerUser, loginUser };
