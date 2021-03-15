import asyncHandler from "express-async-handler";
import SocialMedia from "../models/socialMediaModel.js";

// @desc    Get a list of social media
// @route   GET /api/quotes/socialmedias
// @access  Private
const getSocialMedias = asyncHandler(async (req, res) => {
  const socialMedias = await SocialMedia.find({});
  res.json(socialMedias);
});

export { getSocialMedias };
