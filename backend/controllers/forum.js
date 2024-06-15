const User = require("../models/user.js");
const Forum = require("../models/forum.js");

exports.addQuery = async (req, res) => {
  const { userid, query } = req.body;

  if (!query || !userid) {
    return res.status(401).json({
      success: false,
      message: "Require query and userid",
    });
  }

  try {
    // Create a new forum post
    const post = await Forum.create({
      query: query,
    });

    // Find the user by ID and update the posts array
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.posts.push(post._id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Query added successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in add query",
      error: error.message,
    });
  }
};

exports.getReplies = async (req, res) => {
  const { queryId } = req.body;

  if (!queryId) {
    return res.status(401).json({
      success: false,
      message: "Require queryId",
    });
  }

  try {
    // Find the user by ID and update the posts array
    const query = await Forum.findById(queryId).populate({
      path: "Reply",
    });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    return res.status(200).json({
      success: true,
      replies: query,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in getReplies",
      error: error.message,
    });
  }
};

exports.getUserQueries = async (req,res) =>{ 

}