import express from "express";
import dotenv from "dotenv/config";
import { connectDb } from "./config/db.js";
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("lisiting");
  connectDb();
});
