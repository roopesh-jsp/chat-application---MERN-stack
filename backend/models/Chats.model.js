const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroup: {
      type: Boolean,
      default: false,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    latestMsg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    gropAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", chatsSchema);
module.exports = Chat;
