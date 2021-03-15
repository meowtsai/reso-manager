import asyncHandler from "express-async-handler";
import QuoteItem from "../../models/quotes/QuoteItemModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    return a list of recent quotes Items
// @route   GET /api/quoteitems/list
// @access  Private
const getQuoteItems = asyncHandler(async (req, res) => {
  const quoteItems = await QuoteItem.find({});

  if (quoteItems) {
    res.status(200).json(quoteItems);
  } else {
    res.status(400);
    throw new Error("無法取得報價項目");
  }
});

export { getQuoteItems };
