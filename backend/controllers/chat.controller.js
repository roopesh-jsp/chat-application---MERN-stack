const Chat = require("../models/Chats.model");
const User = require("../models/user.model");

const accessChat = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      throw new Error("userId not provided in req body");
    }
    console.log(req.user._id, userId);

    let isChat = await Chat.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMsg");

    isChat = await User.populate(isChat, {
      path: "latestMsg.sender",
      select: "name image email",
    });
    if (isChat.length > 0) {
      res.json({
        success: true,
        msg: "fetched",
        data: isChat[0],
      });
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      const createdChat = new Chat(chatData);
      await createdChat.save();
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users"
      );

      res.json({
        msg: "created",
        success: true,
        data: fullChat,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: error.message,
    });
  }
};

const fetchChats = async (req, res) => {
  try {
    console.log(req.user._id);

    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMsg")
      .populate("gropAdmin")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "lastesMsg.sender",
      select: "name image email",
    });
    res.json({
      success: true,
      data: chats,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error.message,
    });
  }
};
module.exports = { accessChat, fetchChats };
