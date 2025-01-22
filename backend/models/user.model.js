import e from "express";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1735830678~exp=1735834278~hmac=2a0945fc8bd61dc1c8a797d513317ce640c78751b2674b88d67bf7fbbda8c37d&w=740",
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
