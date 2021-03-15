import asyncHandler from "express-async-handler";
import Channel from "../../models/quotes/ChannelModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    return a list of all channels
// @route   GET /api/quotes/channel
// @access  Private
const getChannels = asyncHandler(async (req, res) => {
  const channels = await Channel.find({});

  if (channels) {
    res.status(200).json(channels);
  } else {
    res.status(400);
    throw new Error("無法取得頻道");
  }
});

// @desc    add a new channel
// @route   POST /api/quotes/channel
// @access  Private
const createChannel = asyncHandler(async (req, res) => {
  const { title, area, socials, intro, note, categories } = req.body;

  const channelExists = await Channel.findOne({ title });

  if (channelExists) {
    res.status(400);
    throw new Error("頻道名稱已經存在");
  }

  const channel = await Channel.create({
    title,
    area,
    categories,
    socials,
    intro,
    note,
  });

  if (channel) {
    res.status(201).json({
      _id: channel._id,
      title: channel.title,
      area: channel.area,
      categories: channel.categories,
      socials: channel.socials,
      intro: channel.intro,
      note: channel.note,
      status: channel.status,
    });
  } else {
    res.status(400);
    throw new Error("新增失敗");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getChannelById = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);

  if (channel) {
    res.json(channel);
  } else {
    res.status(404);
    throw new Error("channel not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);

  if (channel) {
    channel.title = req.body.title;
    channel.area = req.body.area;
    channel.categories = req.body.categories;
    channel.socials = req.body.socials;
    channel.intro = req.body.intro;
    channel.note = req.body.note;
    channel.status = req.body.status;

    const updatedChannel = await channel.save();

    res.json({
      _id: updatedChannel._id,
      title: updatedChannel.title,
      area: updatedChannel.area,
      categories: updatedChannel.categories,
      socials: updatedChannel.socials,
      intro: updatedChannel.intro,
      note: updatedChannel.note,
      status: updatedChannel.status,
    });
  } else {
    res.status(404);
    throw new Error("Channel not found");
  }
});

export { getChannels, createChannel, getChannelById, updateChannel };
