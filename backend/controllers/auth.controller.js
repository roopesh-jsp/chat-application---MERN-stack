const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const generateToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECERT);
  console.log(token);

  return token;
};

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!email || !name || !password || !confirmPassword) {
      throw new Error("enter all fields");
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error("user already exists");
    }
    const hashedPw = await bcryptjs.hash(password, 10);
    console.log(hashedPw);

    const user = new User({
      name,
      email,
      password: hashedPw,
    });

    await user.save();
    const token = await generateToken(user._id);
    res.json({
      success: true,
      user: {
        ...user._doc,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = { register };
