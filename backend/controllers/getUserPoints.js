const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path to your User model

exports.getUserPoints = async (req, res) => {
  const { token } = req.body;

  // Check if token is present
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing"
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in the database
    const user = await User.findById({"_id": decoded.id});

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Return user's points
    return res.status(200).json({
      success: true,
      points: user.points
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};


