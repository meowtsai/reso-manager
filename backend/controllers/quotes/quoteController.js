import asyncHandler from "express-async-handler";
import Quote from "../../models/quotes/QuoteModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    return a list of recent quotes
// @route   GET /api/quotes
// @access  Private
const getQuotes = asyncHandler(async (req, res) => {
  const quotes = await Quote.find({}).sort({ date: -1 }).limit(20);

  if (quotes) {
    res.status(200).json(quotes);
  } else {
    res.status(400);
    throw new Error("無法取得報價");
  }
});

// @desc    add a new quote record
// @route   POST /api/quotes
// @access  Private
const createQuote = asyncHandler(async (req, res) => {
  const {
    channel,
    date,
    item,
    purchasePrice,
    marketPrice,
    platform,
    note,
  } = req.body;

  const quoteExists = await Quote.findOne({ channel, date, item });

  if (quoteExists) {
    res.status(400);
    throw new Error("該報價項目已經存在");
  }

  const quote = await Quote.create({
    channel,
    date,
    item,
    purchasePrice,
    marketPrice,
    platform,
    note,
  });

  if (quote) {
    res.status(201).json({
      _id: quote._id,
      channel: quote.channel,
      date: quote.date,
      item: quote.item,
      purchasePrice: quote.purchasePrice,
      marketPrice: channel.marketPrice,
      platform: channel.platform,
      note: channel.note,
    });
  } else {
    res.status(400);
    throw new Error("新增失敗");
  }
});

// @desc    Get quote by ID
// @route   GET /api/quotes/detail/:id
// @access  Private/Admin
const getQuoteById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (quote) {
    res.json(quote);
  } else {
    res.status(404);
    throw new Error("quote not found");
  }
});

// @desc    Get quote by channel id
// @route   POST /api/quote/query
// @access  Private/Admin  可能是尋找特定頻道主或是所有fb發文報價紀錄
const getQuoteByCondition = asyncHandler(async (req, res) => {
  const condition = req.body;
  const quotes = await Quote.find(condition);

  if (quotes) {
    res.json(quotes);
  } else {
    res.status(404);
    throw new Error("quotes not found");
  }
});

// @desc    Update quote
// @route   PUT /api/quotes/detail/:id
// @access  Private/Admin
const updateQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (quote) {
    quote.channel = req.body.channel;
    quote.date = req.body.date;
    quote.item = req.body.item;
    quote.purchasePrice = req.body.purchasePrice;
    quote.marketPrice = req.body.marketPrice;
    quote.platform = req.body.platform;
    quote.note = req.body.note;

    const updatedQuote = await quote.save();

    res.json({
      _id: updatedQuote._id,
      channel: updatedQuote.channel,
      date: updatedQuote.date,
      item: updatedQuote.item,
      purchasePrice: updatedQuote.purchasePrice,
      marketPrice: updatedQuote.marketPrice,
    });
  } else {
    res.status(404);
    throw new Error("quote not found");
  }
});

// @desc    Delete a quote record
// @route   DELETE /api/quotes/detail/:id
// @access  Private
const deleteQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (quote) {
    await quote.remove();
    res.json({ message: "quote removed" });
  } else {
    res.status(404);
    throw new Error("quote not found");
  }
});

export {
  getQuotes,
  createQuote,
  getQuoteByCondition,
  updateQuote,
  deleteQuote,
  getQuoteById,
};
