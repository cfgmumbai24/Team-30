const jwt = require('jsonwebtoken');
const User = require('../models/user.js'); // Adjust the path as needed

const updatePoints = async (req, res) => {
  const { flag, moduleName } = req.body;

  // Check if the module completion flag is false
  if (!flag) {
    return res.status(400).json({
      success: false,
      message: "Module not completed"
    });
  }

  const token = req.cookies.token;

  // Check if token is present
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please Login first"
    });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decode.id);

    // Check if the module is already completed
    if (user.moduleCompleted.includes(moduleName)) {
      return res.status(400).json({
        success: true,
        message: "Module already completed"
      });
    }

    // Add the module to the completed list and update points
    user.moduleCompleted.push(moduleName);
    user.points += 10;

    // Save the user document
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Module added and points updated"
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = updatePoints;
