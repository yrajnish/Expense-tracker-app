const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while logging in.',
      error: error.message,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const { email, password, ...otherFields } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists.',
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new userModel({
      ...otherFields,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while registering the user.',
      error: error.message,
    });
  }
};
module.exports = { loginController, registerController };
