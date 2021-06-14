import asyncHandler from "express-async-handler";
import Channel from "../../models/quotes/ChannelModel.js";
import Quote from "../../models/quotes/QuoteModel.js";
import Permission from "../../models/permissionModel.js";
import NoxTrackingChannel from "../../models/quotes/NoxTrackingChannelModel.js";
import SocialData from "../../models/quotes/SocialDataModel.js";
import setFilename from "../../utils/helper.js"
import Tag from "../../models/quotes/TagModel.js";
import path from "path"
import dotenv from "dotenv";
dotenv.config();
// @desc    return a list of all channels
// @route   GET /api/quotes/channel
// @access  Private
const getChannels = asyncHandler(async (req, res) => {
  const tagId = req.query.tagId;
  console.log(tagId);
  let getCondition = {};
  if (tagId) {
    getCondition.tags = tagId;
  }
  const channels = await Channel.find(getCondition);

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
// @route   GET /api/quotes/:id
// @access  Private/Admin
const getChannelById = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  const noxData = await NoxTrackingChannel.find({ channel: req.params.id })
    .sort({ createdAt: -1 })
    .limit(1);

  if (channel) {
    const textTags = await Tag.find({ _id: { $in: channel.tags } }).select({
      _id: 1,
      name: 1,
    });

    res.json({ ...channel._doc, textTags, noxData: noxData ? noxData[0] : {} });
  } else {
    res.status(404);
    throw new Error("channel not found");
  }
});

// @desc    Update channel
// @route   POST /api/quotes/:id
// @access  Private/Admin
const updateChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  //console.log(req.body)
  
  //console.log(" JSON.parse(channel.socials);", JSON.parse(JSON.stringify(channel.socials)) )

  if (channel) {
    channel.title = req.body.title ?? channel.title;
    channel.area = req.body.area ?? channel.area;
    channel.categories =  req.body.categories.split(",").map(i=> parseInt(i)) ?? channel.categories;
    channel.socials =JSON.parse( req.body.socials) ?? channel.socials;
    channel.intro = req.body.intro ?? channel.intro;
    channel.note = req.body.note ?? channel.note;
    channel.status = req.body.status ?? channel.status;

    if (req.files) {
     
      if (Object.keys(req.files).length>0) {
        Object.keys(req.files).forEach((key,index)=>{
          //console.log("req.files",req.files[key])
          const newFileName =  setFilename() + path.extname(req.files[key].name).toLowerCase();
          //console.log("newFileName", newFileName)
          req.files[key].mv(
            `${process.env.AVATAR_DIR}/${newFileName}`,
            (err) => {
              console.log("files move error", err)
              if (err)
                return res.status(500).send({ avatarFile: err.message });
            }
          );

          channel.thumbnails =`${process.env.AVATAR_PATH}/${newFileName}`
        })
        
      }
    }

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
      thumbnails:updatedChannel.thumbnails
    });
  } else {
    res.status(404);
    throw new Error("Channel not found");
  }
});

// @desc    Update tag column
// @route   POST /api/quotes/channel/tags
// @access  Private/Admin
const updateChannelTags = asyncHandler(async (req, res) => {
  const { channelId, tags } = req.body;
  //console.log(req.body);
  const channel = await Channel.findById(channelId);

  if (channel) {
    if (Array.isArray(tags)) {
      const tagList = [];
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        const existedTag = await Tag.findOne({ name: tag });
       // console.log("existedTag", existedTag);
        if (existedTag) {
          tagList.push(existedTag._id);
        } else {
          const insertedTag = await Tag.create({ name: tag });
          console.log("insertedTag", insertedTag);
          tagList.push(insertedTag._id);
        }
      }
      console.log("tagList", tagList);

      channel.tags = tagList;
      const updatedChannel = await channel.save();

      res.json({
        _id: updatedChannel._id,
        tags: updatedChannel.tags,
      });
    } else {
      res.status(400);
      throw new Error("Tags must be an array");
    }
  } else {
    res.status(404);
    throw new Error("Channel not found");
  }
});

// @desc    Delete a quote record
// @route   DELETE /api/quotes/detail/:id
// @access  Private
const deleteChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);

  if (channel) {
    const cR = await Channel.deleteOne({ _id: req.params.id });
    //console.log("cr", cR);
    const qR = await Quote.remove({ channel: channel._id });
    //console.log("qR", qR);
    const nR = await NoxTrackingChannel.remove({ channel: channel._id });
    //console.log("nR", nR);
    const sR = await SocialData.remove({ channel: channel._id });
    //console.log("sR", sR);

    res.json({ message: "channel removed" });
  } else {
    res.status(404);
    throw new Error("channel not found");
  }
});

export {
  getChannels,
  createChannel,
  getChannelById,
  updateChannel,
  updateChannelTags,
  deleteChannel,
};
