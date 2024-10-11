const express = require("express");

const { protect } = require("../middleware/Protect");
const { accessChat, fetchChats } = require("../controllers/chat.controller");

const chatRoutes = express.Router();

chatRoutes.post("/accessChat", protect, accessChat);

chatRoutes.get("/fetchChats", protect, fetchChats);

module.exports = chatRoutes;
