const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forum",
    },
  ],
});

module.exports = mongoose.model("User", userSchema); 
