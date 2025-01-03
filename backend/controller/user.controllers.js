import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
  try {
    //extraing the values
    const { name, email, password } = req.body;

    //checking for the empty fields
    if (!name || !email || !password) {
      throw new Error("please fill all the fields");
    }

    //checking if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("user already registered");
    }

    //hashing the password
    const hashedPw = await bcrypt.hash(password, 10);

    //creating new user
    const newUser = new User({
      name,
      email,
      password: hashedPw,
    });
    await newUser.save();

    //creating jsonwebtoken
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    //sending success response
    res.json({
      success: true,
      message: "user registered successfully",
      token,
    });
  } catch (error) {
    //sending the error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    //extracting values
    const { email, password } = req.body;

    //checking for empty fields
    if (!email || !password) {
      throw new Error("please fill all the fields");
    }

    //checking if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not registered");
    }

    //cheking of the password matches
    console.log(password, user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      throw new Error(" wrong credentials");
    }

    //creating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //Ssending response
    res.json({
      success: true,
      message: "user logged in",
      token,
    });
  } catch (error) {
    //sending the error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const serachTerm = req.query.search;

    //query to find the users with that name or email
    const query = {
      $or: [
        { name: { $regex: serachTerm, $options: "i" } },
        {
          email: {
            $regex: serachTerm,
            $options: "i",
          },
        },
      ],
    };

    //quering db
    const users = await User.find(query)
      .find({
        email: { $ne: req.user.email },
      })
      .select("-password");

    //sending response
    res.json({
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { userRegister, loginUser, searchUsers };
