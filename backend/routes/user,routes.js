import express from "express";
import {
  getUserData,
  loginUser,
  searchUsers,
  userRegister,
} from "../controller/user.controllers.js";
import { protect } from "../middleware/protect.js";

const userRouter = express.Router();

//to register a user
userRouter.post("/register", userRegister);

userRouter.post("/login", loginUser);

userRouter.get("/users", protect, searchUsers);

userRouter.get("/", protect, getUserData);

export default userRouter;
