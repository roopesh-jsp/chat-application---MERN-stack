const express = require("express");
const authRoutes = require("./routes/auth.routes");
const connectDb = require("./config/db");

const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connectDb();
  console.log("app running at ", process.env.PORT);
});
