const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/helper");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password with bcrypt before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Check if user was successfully created
    if (newUser) {
      // Send a success response with the new user's details
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        message: "Registration successful",
      });
    } else {
      return res.status(400).json({ message: "Failed to register the user" });
    }
  } catch (error) {
    console.error("Registration Error:", error.message);

    // Handle specific errors, such as database errors or validation errors
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", details: error.message });
    }

    // General server error
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return success with user data and JWT token
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken({
        id: user._id,
        name: user.name,
        email: user.email,
      }),
    });
  } catch (error) {
    console.error("Login Error: ", error.message);

    // Specific error handling based on the error type
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", details: error.message });
    }

    // General server error
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

module.exports = { registerUser, loginUser };
