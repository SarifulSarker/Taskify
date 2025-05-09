const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should have at least 4 characters" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🔒 Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save hashed password
    });

    await newUser.save();

    return res.status(201).json({ message: "Sign in successful" });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// login route

router.post("/log-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, username },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(200).json({ message:"Login SUccessfully", id: existingUser._id, token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
  });
  


module.exports = router;
