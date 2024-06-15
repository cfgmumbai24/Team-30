const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true,
  },

  points:{
    type: Number,  // make default value as 0
    default: 0,    // Added default value for points
  },

  phoneno:{
    type: Number,
    required: true,
  },

  area:{
    type: String,
    trim: true,
  },

  email :{
    type: String,
  },

  moduleCompleted: [
    {
      type: String,
    },
  ],
});

// Export the User model
module.exports = mongoose.model("User", userSchema); 
