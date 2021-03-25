import asyncHandler from "express-async-handler";
import Tag from "../../models/quotes/TagModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    return a list of tags
// @route   GET /api/quotes/tags
// @access  Private
const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find({});

  if (tags) {
    res.status(200).json(tags);
  } else {
    res.status(400);
    throw new Error("無法取得標籤");
  }
});

// @desc    add a new tag
// @route   POST /api/quotes/tag
// @access  Private
const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const tagExists = await Tag.findOne({ name });

  if (tagExists) {
    res.status(400);
    throw new Error("該標籤項目已經存在");
  }

  const tag = await Tag.create({
    name,
  });

  if (tag) {
    res.status(201).json({
      _id: tag._id,
      name: tag.name,
    });
  } else {
    res.status(400);
    throw new Error("新增失敗");
  }
});

// @desc    Get tag by ID
// @route   GET /api/quotes/tag/:id
// @access  Private/Admin
const getTagById = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (tag) {
    res.json(tag);
  } else {
    res.status(404);
    throw new Error("tag not found");
  }
});

// @desc    Update tag
// @route   PUT /api/quotes/tag/:id
// @access  Private/Admin
const updateTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (tag) {
    tag.name = req.name;

    const updatedTag = await quote.save();

    res.json({
      _id: updatedTag._id,
      name: updatedTag.name,
    });
  } else {
    res.status(404);
    throw new Error("quote not found");
  }
});

// @desc    Delete a quote record
// @route   DELETE /api/quotes/detail/:id
// @access  Private
const deleteTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (tag) {
    await tag.remove();
    res.json({ message: "tag removed" });
  } else {
    res.status(404);
    throw new Error("tag not found");
  }
});

export { getTags, createTag, updateTag, deleteTag, getTagById };
