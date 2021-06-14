import express from "express";
const router = express.Router();
import { getSocialMedias } from "../../controllers/quotesController.js";
import { getCategories } from "../../controllers/quotes/serviceCategoriesController.js";
import {
  getQuotes,
  createQuote,
  getQuoteByCondition,
  updateQuote,
  getQuoteById,
  deleteQuote,
} from "../../controllers/quotes/quoteController.js";
import {
  getChannels,
  createChannel,
  getChannelById,
  updateChannel,
  updateChannelTags,
  deleteChannel,
} from "../../controllers/quotes/channelController.js";
import {
  createSocialData,
  getSocialDataByCondition,
  updateSocialData,
  deleteSocialData,
  getSocialDataById,
} from "../../controllers/quotes/socialDataController.js";

import { getDataForPricingPage } from "../../controllers/quotes/pricingController.js";

import { getTags } from "../../controllers/quotes/tagController.js";

import { getQuoteItems } from "../../controllers/quotes/quoteItemController.js";

import { protect, admin } from "../../middleware/authMiddleware.js";
//router.route("/socialmedias").get(protect, admin, getSocialMedias);
router.route("/socialmedias").get(getSocialMedias);

router.route("/categories").get(getCategories);
router.route("/channel").get(getChannels).post(createChannel);
router
  .route("/channel/:id")
  .get(getChannelById)
  .post(updateChannel)
  .delete(deleteChannel);

router.route("/").get(getQuotes).post(createQuote);
router
  .route("/detail/:id")
  .get(getQuoteById)
  .put(updateQuote)
  .delete(deleteQuote);
router.route("/query").post(getQuoteByCondition);
router.route("/quoteitem").get(getQuoteItems);

router.route("/channel/:id/tags").post(updateChannelTags);
router.route("/tags").get(getTags);

router.route("/socialdata").post(createSocialData);

router.route("/socialdata/:channelId/query").post(getSocialDataByCondition);
router
  .route("/socialdata/:id")
  .get(getSocialDataById)
  .put(updateSocialData)
  .delete(deleteSocialData);

router.route("/pricing").post(getDataForPricingPage);

export default router;
