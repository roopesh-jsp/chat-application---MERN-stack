import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    if (!chatId || !content) {
      throw new Error("empty or undefined data was passed");
    }

    let message = new Message({
      content,
      chat: chatId,
      sender: req.user._id,
    });

    //updating lastmessage

    const chat = await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message,
    });
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Populate sender and chat fields
    message = await message.populate("sender chat");
    message = await User.populate(message, {
      path: "chat.users",
    });
    await message.save();

    res.json({
      success: true,
      message,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name image email ")
      .populate("chat");

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
export { sendMessage, getAllMessage };
