const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get phoneno from request body
    const { phoneno, password } = req.body;

    // Check if phone number is present
    if (!phoneno || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Phone Number and Password is required`,
      });
    }

    // Find user with provided phone number
    const user = await User.findOne({ phoneno });

    // If user not found with provided phone number
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please Register to Continue`,
      });
    }

    // compare password
    if ((await bcrypt.compare(user.password, password)) === 0) {
      return res.status(400).json({
        success: false,
        message: "Your password is incorrect",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { phoneno: user.phoneno, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Save token to user document in database
    user.token = token;
    user.password = "";

    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: `User Login Success`,
    });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

exports.register = async (req, res) => {
  const { name, phoneno, area, email, password } = req.body;

  if (!name || !password || !phoneno) {
    return res.status(400).json({
      success: false,
      message: "Password, Phone and Name are required", // Corrected grammar
    });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      phoneno: phoneno, // Explicitly specifying the field names (optional, for clarity)
      email: email,
      area: area,
      password: hashedPassword,
    });

    return res.status(200).json({
      // Corrected `response` to `res`
      success: true,
      message: "User created successfully",
      user, // Optionally, you might want to return the created user object
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while creating user",
      error: error.message, // Optionally, include the error message for debugging purposes
    });
  }
};
