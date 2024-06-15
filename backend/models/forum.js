const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  query: {
    type: String,
    trim: true,
  },

  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply", 
    },
  ],
});

module.exports = mongoose.model("Forum", forumSchema);
