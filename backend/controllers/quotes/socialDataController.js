import asyncHandler from "express-async-handler";
import SocialData from "../../models/quotes/SocialDataModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    Get socialdata by channel id
// @route   POST /api/quote/socialdata/query
// @access  Private/Admin  可能是尋找特定頻道主或是所有fb發文報價紀錄
const getSocialDataByCondition = asyncHandler(async (req, res) => {
  const condition = req.body;
  const data = await SocialData.find(condition);

  if (data) {
    res.json(data);
  } else {
    res.status(404);
    throw new Error("SocialData not found");
  }
});

// @desc    add a new  record
// @route   POST /api/quotes/socialdata
// @access  Private
const createSocialData = asyncHandler(async (req, res) => {
  const { channel, date, platform, count } = req.body;

  console.log("createSocialData", req.body);

  const quoteExists = await SocialData.findOne({ channel, date, platform });

  if (quoteExists) {
    res.status(400);
    throw new Error("該日期平台追蹤資料已經存在");
  }

  const sd = await SocialData.create({
    channel,
    date,
    platform,
    count,
  });

  if (sd) {
    res.status(201).json({
      _id: sd._id,
      channel: sd.channel,
      date: sd.date,
      count: sd.count,
      platform: sd.platform,
    });
  } else {
    res.status(400);
    throw new Error("新增失敗");
  }
});

// @desc    Get social data record by ID
// @route   GET /api/quotes/socialdata/detail/:id
// @access  Private/Admin
const getSocialDataById = asyncHandler(async (req, res) => {
  const socialData = await SocialData.findById(req.params.id);

  if (socialData) {
    res.json(socialData);
  } else {
    res.status(404);
    throw new Error("socialData not found");
  }
});

// @desc    Update SocialData
// @route   PUT /api/quotes/socialdata/detail/:id
// @access  Private/Admin
const updateSocialData = asyncHandler(async (req, res) => {
  const socialData = await SocialData.findById(req.params.id);

  if (socialData) {
    socialData.channel = req.body.channel;
    socialData.date = req.body.date;
    socialData.count = req.body.count;
    socialData.platform = req.body.platform;

    const updatedSocialData = await socialData.save();

    res.json({
      _id: updatedSocialData._id,
      channel: updatedSocialData.channel,
      date: updatedSocialData.date,
      count: updatedSocialData.count,
    });
  } else {
    res.status(404);
    throw new Error("quote not found");
  }
});

// @desc    Delete a SocialData record
// @route   DELETE /api/quotes/socialdata/detail/:id
// @access  Private
const deleteSocialData = asyncHandler(async (req, res) => {
  const socialData = await SocialData.findById(req.params.id);

  if (socialData) {
    await socialData.remove();
    res.json({ message: "socialData removed" });
  } else {
    res.status(404);
    throw new Error("socialData not found");
  }
});

export {
  createSocialData,
  getSocialDataByCondition,
  updateSocialData,
  deleteSocialData,
  getSocialDataById,
};
