import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";

const acessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error("no userId provided");
    }

    let chat = await Chat.findOne({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("lastMessage");

    chat = await User.populate(chat, {
      path: "lastMessage.sender",
    });

    if (!chat) {
      const newChat = new Chat({
        chatName: "sender",
        users: [req.user._id, userId],
      });

      await newChat.save();

      const fullChat = await Chat.findById(newChat._id)
        .populate("users", "-password")
        .populate("lastMessage");
      return res.status(200).json(fullChat);
    }

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
  }
};

export { acessChat };
