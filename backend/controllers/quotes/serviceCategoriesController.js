import asyncHandler from "express-async-handler";
import ServiceCategory from "../../models/quotes/ServiceCategoriesModel.js";

// @desc    return a list of all categories
// @route   GET /api/quotes/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await ServiceCategory.find({});

  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error("無法取得類別");
  }
});

export { getCategories };
