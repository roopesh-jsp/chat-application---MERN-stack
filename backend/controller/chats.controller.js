import { Mongoose } from "mongoose";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";

const acessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error("no userId provided");
    }
    const sender = await User.findById(userId);

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

const fetchChats = async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("lastMessage")
      .populate("groupAdmin")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "lastMessage.sender",
    });

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    console.log(error);
  }
};

const createGroupChat = async (req, res) => {
  try {
    const { chatName, users } = req.body;
    // let users = JSON.parse(req.body.users);
    if (!chatName || !users) {
      throw new Error("no chatName or users provided");
    }

    if (users.length < 2) {
      throw new Error("caant creat group with single user");
    }

    users.push(req.user._id);
    console.log(users);

    const groupChat = new Chat({
      chatName,
      users,
      isGroup: true,
      groupAdmin: req.user._id,
    });
    groupChat.save();

    const fullChat = await Chat.findById(groupChat._id)
      .populate("lastMessage")
      .populate("groupAdmin");
    // .populate("users");
    console.log(fullChat);

    res.json({
      success: true,
      chat: fullChat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateGroupChat = async (req, res) => {
  try {
    const { chatId, chatName, users } = req.body;

    if (!chatName || !users) {
      throw new Error("no chatName or users provided");
    }

    if (users.length < 2) {
      throw new Error("caant creat group with single user");
    }

    const chat = await Chat.findById(chatId).populate("groupAdmin");
    console.log(chat.groupAdmin, req.user);

    if (chat.groupAdmin._id.toString() !== req.user._id.toString()) {
      throw new Error("unAuthorized access");
    }
    users.push(req.user._id);

    const fullChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
        users,
      },
      { new: true }
    )
      .populate("lastMessage")
      .populate("groupAdmin");

    res.json({
      success: true,
      chat: fullChat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("lastMessage")
      .populate("groupAdmin");

    res.json({
      success: true,
      chat: updatedChat,
    });
  } catch (error) {
    console.log(error);
  }
};

const addUserToGroup = async (req, res) => {
  try {
    let { chatId, newUsers } = req.body;
    newUsers = JSON.parse(newUsers);
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: { $each: newUsers } },
      },
      { new: true }
    )
      .populate("users", "-passowrd")
      .populate("lastMessage")
      .populate("groupAdmin");

    res.json({ success: true, chat });
  } catch (error) {
    console.log(error);
  }
};

const removeUserFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    console.log(chatId, userId);

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("lastMessage")
      .populate("groupAdmin");

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
  }
};

const getReciversData = async (req, res) => {
  try {
    const { chatId } = req.body;
    const chat = await Chat.findById(chatId);

    // const users = [];

    // let reciverId = "";

    // chat.users.forEach((userId) => {
    //   // console.log(userId, req.user);

    //   if (userId.toString() != req.user._id.toString()) {
    //     // console.log(userId, req.user._id);
    //     reciverId = userId;
    //   }
    // });
    const users = chat.users.filter(
      (user) => user._id.toString() != req.user._id.toString()
    );

    // const reciver = await User.findById(reciverId);

    // Assuming User is your Mongoose model
    const userPromises = users.map(async (userId) => {
      const foundUser = await User.findById(userId);
      return foundUser;
    });

    // This will return an array of user objects
    const foundUsers = await Promise.all(userPromises);

    console.log(foundUsers);

    res.json({ success: true, user: foundUsers });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getGroupData = async (req, res) => {};
export {
  acessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addUserToGroup,
  getReciversData,
  removeUserFromGroup,
  updateGroupChat,
};
