const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({ 
  reply: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Reply", replySchema); 
