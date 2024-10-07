const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  console.log("hai");
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);

      const decoded = jwt.verify(token, process.env.JWT_SECERT);

      if (!decoded.id) {
        throw new Error("not valid token");
      }

      req.user = await User.findById(decoded.id).select("-password");
    } else {
      throw new Error("no token found");
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: error.message,
    });
  }
  next();
};

module.exports = { protect };
