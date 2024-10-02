const mongoose = require("mongoose");

const connectDb = async (req, res) => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://rupzkumar5:1234@mernchatapp.gqg8p.mongodb.net/?retryWrites=true&w=majority&appName=mernChatApp"
    );
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
