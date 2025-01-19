import express from "express";
import { protect } from "../middleware/protect.js";
import {
  getAllMessage,
  sendMessage,
} from "../controller/message.controller.js";

const msgRouter = express.Router();

msgRouter.post("/", protect, sendMessage);

msgRouter.get("/:chatId", protect, getAllMessage);

export default msgRouter;
