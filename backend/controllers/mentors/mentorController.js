import asyncHandler from "express-async-handler";
import Mentor from "../../models/mentors/MentorModel.js ";
import colors from "colors";

// @desc    Get all mentors
// @route   GET /api/mentors/mentors
// @access  Private/Admin
const getMentors = asyncHandler(async (req, res) => {
  // db.orders.aggregate([
  //   {
  //     $lookup: {
  //       from: "inventory",
  //       localField: "item",
  //       foreignField: "sku",
  //       as: "inventory_docs",
  //     },
  //   },
  // ]);

  //const mentors = await Mentor.find({});
  const mentors = await Mentor.aggregate([
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "gameId",
        as: "course",
      },
    },
  ]);

  res.json(mentors);
});

// @desc    Get mentor by ID
// @route   GET /api/mentors/:id
// @access  Private/Admin
const getMentorById = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (mentor) {
    res.json(mentor);
  } else {
    res.status(404);
    throw new Error("Mentor not found");
  }
});

// @desc    Update mentor
// @route   PUT /api/mentors/:id
// @access  Private/Admin
const updateMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (mentor) {
    mentor.status = req.body.status === 1 ? 1 : 0;

    console.log(mentor.status);

    const updatedMentor = await mentor.save();
    console.log("updatedMentor", updatedMentor);

    res.json(updatedMentor);
  } else {
    res.status(404);
    throw new Error("Mentor not found");
  }
});
export { getMentors, getMentorById, updateMentor };
