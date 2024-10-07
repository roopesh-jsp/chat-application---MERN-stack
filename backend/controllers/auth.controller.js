const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
// const { use } = require("../routes/auth.routes");

const generateToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECERT);
  console.log(token);

  return token;
};

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(req.body);

  console.log(name, email, password, confirmPassword);

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
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("user not exists");
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      throw new Error("wrong password");
    }

    const token = await generateToken(user._id);

    res.json({
      success: true,
      token,
      msg: "logged in",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  const searchTerm = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log(req.user);

  const users = await User.find(searchTerm).find({
    _id: { $ne: req.user._id },
  });
  // console.log(users);

  res.json({
    users,
  });
};

module.exports = { register, login, getUsers };
