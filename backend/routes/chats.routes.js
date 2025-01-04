import express from "express";
import {
  acessChat,
  addUserToGroup,
  createGroupChat,
  fetchChats,
  removeUserFromGroup,
  renameGroup,
} from "../controller/chats.controller.js";
import { protect } from "../middleware/protect.js";

const chatRoutes = express.Router();

// to load or creat a chat b/w two users
chatRoutes.post("/access-chat", protect, acessChat);

chatRoutes.post("/fetch-chats", protect, fetchChats);

chatRoutes.post("/create-group", protect, createGroupChat);

chatRoutes.post("/rename", protect, renameGroup);

chatRoutes.post("/add-users", protect, addUserToGroup);

chatRoutes.post("/remove-user", protect, removeUserFromGroup);

export default chatRoutes;
