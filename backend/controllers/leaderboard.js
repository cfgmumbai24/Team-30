const user = require("../models/user");

exports.leaderboard = async (req, res) => {
  const ranking = await user.aggregate([
    {
      $sort: { points: -1 },
    },
    {
      $limit: 10,
    },
  ]);

  return res.status(200).json({
    data: ranking[0],
  });
};
