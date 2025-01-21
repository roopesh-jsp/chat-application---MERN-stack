import express from "express";
import dotenv from "dotenv/config";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/user,routes.js";
import chatRoutes from "./routes/chats.routes.js";
import cors from "cors";
import msgRouter from "./routes/message.routes.js";
import { Server } from "socket.io";

// creating express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRouter);
app.use("/chats", chatRoutes);
app.use("/message", msgRouter);

//listing to server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("lisiting");
  connectDb();
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected io");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log(userData?._id);

    socket.emit("connected");
  });

  socket.on("chat-room", (room) => {
    socket.join(room);
    console.log("user joined" + room);
  });

  socket.on("new msg", (newMsgRecived) => {
    let chat = newMsgRecived.chat;

    if (!chat.users) return console.log("user not defined");

    chat.users.forEach((user) => {
      if (user._id == newMsgRecived.sender._id) return;

      socket.in(user._id).emit("newMsgRecived", newMsgRecived);
    });
  });
});
