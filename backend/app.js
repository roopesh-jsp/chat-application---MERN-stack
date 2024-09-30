const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("hai");
});

app.listen(process.env.PORT, () => {
  console.log("app running at ", process.env.PORT);
});
