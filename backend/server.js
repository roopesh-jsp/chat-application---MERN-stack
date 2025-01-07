import express from "express";
import dotenv from "dotenv/config";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/user,routes.js";
import chatRoutes from "./routes/chats.routes.js";
import cors from "cors";

// creating express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRouter);
app.use("/chats", chatRoutes);

//listing to server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("lisiting");
  connectDb();
});
