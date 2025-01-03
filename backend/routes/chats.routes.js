import express from "express";
import { acessChat } from "../controller/chats.controller.js";
import { protect } from "../middleware/protect.js";

const chatRoutes = express.Router();

// to load or creat a chat b/w two users
chatRoutes.post("/access-chat", protect, acessChat);

export default chatRoutes;
