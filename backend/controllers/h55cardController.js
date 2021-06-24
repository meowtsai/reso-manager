import asyncHandler from "express-async-handler";
import H55Card from "../models/H55CardModal.js";
import Log from "../models/logModel.js";

// @desc    Get all cards
// @route   GET /api/h55card/list
// @access  Private/Admin
const getCards = asyncHandler(async (req, res) => {
  const cards = await H55Card.find({}).sort({ createdAt : -1 });
  res.json(cards);
});


// @desc    Delete a card
// @route   DELETE /api/h55card/:id
// @access  Private/Admin
const deleteCard = asyncHandler(async (req, res) => {
  const card = await H55Card.findById(req.params.id);

  if (card) {
    await card.remove();
    const newLog = new Log({
      user_id: req.user._id,
      event: `${req.user.name} 將第五人格三周年卡片 ${card.imgUrl} 刪除`,
    });

    newLog.save();
    res.json({ message: "已經刪除", deleted_id: req.params.id });
  } else {
    res.status(404);
    throw new Error("沒有這個紀錄");
  }
});

export { getCards, deleteCard };
