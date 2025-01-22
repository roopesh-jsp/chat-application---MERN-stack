import express from "express";
import dotenv from "dotenv/config";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/user,routes.js";
import chatRoutes from "./routes/chats.routes.js";
import cors from "cors";
import msgRouter from "./routes/message.routes.js";
import { Server } from "socket.io";

// Express app setup
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/chats", chatRoutes);
app.use("/message", msgRouter);

// Server setup
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDb();
});

// Socket.io setup
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Socket.io connected", "io");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log("User joined room:", userData?._id);
    socket.emit("connected");
  });

  socket.on("chat-room", (room) => {
    socket.join(room);
    console.log("User joined chat room: " + room);
  });

  socket.on("new msg", (newMsgReceived) => {
    let chat = newMsgReceived.chat;

    if (!chat.users) return console.log("Chat users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMsgReceived.sender._id) return;

      socket.in(user._id).emit("newMsgRecived", newMsgReceived);
    });
  });
});
