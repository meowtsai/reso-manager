import asyncHandler from "express-async-handler";
import Channel from "../../models/quotes/ChannelModel.js";
import Quote from "../../models/quotes/QuoteModel.js";
import QuoteItem from "../../models/quotes/QuoteItemModel.js";
import NoxTrackingChannel from "../../models/quotes/NoxTrackingChannelModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    return data for pricing page
// @route   GET /api/quotes/pricing
// @access  Private
const getDataForPricingPage = asyncHandler(async (req, res) => {
  const channels = await Channel.find();
  const quoteItems = await QuoteItem.find({});
  const noxData = await NoxTrackingChannel.aggregate([
    { $match: {} },
    {
      $group: {
        _id: {
          channel: "$channel",
        },
        subscribers: { $last: "$subscribers" },
        lastThirtyVideoViews: { $last: "$lastThirtyVideoViews" },
        date: { $last: "$createdAt" },
      },
    },
  ]);

  const quotes = await Quote.aggregate([
    { $match: {} },
    {
      $group: {
        _id: { channel: "$channel", item: "$item" },
        latest: { $last: "$purchasePrice" },
      },
    },
    {
      $lookup: {
        from: "channels",
        localField: "_id",
        foreignField: "_id",
        as: "ChannelDetail",
      },
    },
    { $sort: { item: 1, date: 1 } },
  ]);

  // db.quotes.aggregate([
  //     { $match:{}},
  //     { $group:{_id: {channel:"$channel", item:"$item"} , latest :{$last:"$purchasePrice"}}},
  //     { $lookup:{from:"channels",localField:"_id", foreignField:"_id",as:"ChannelDetail"}},
  //     { $sort: { item: 1, date: 1 } },
  // ])

  //console.log("noxData", noxData);
  if (channels && quotes) {
    res.status(200).json({ channels, quotes, quoteItems, noxData });
  } else {
    res.status(400);
    throw new Error("無法取得頻道");
  }
});

export { getDataForPricingPage };
