import asyncHandler from "express-async-handler";
import Course from "../../models/mentors/CourseModel.js ";
import Mentor from "../../models/mentors/MentorModel.js ";
// @desc    Get all game
// @route   GET /api/mentors/games
// @access  Private/Admin
const getGames = asyncHandler(async (req, res) => {
  const games = await Course.find({});
  const mentors = await Mentor.find({});

  res.json({ games, mentors });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.role = req.body.role || user.role;
//     user.isAdmin = req.body.isAdmin;

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

export { getGames };
