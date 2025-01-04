import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const protect = async (req, res, nxt) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //extraticng token
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.decode(token, process.env.JWT_SECRET);

      //checking if the token is valid
      if (!decode) {
        throw new Error("inValid token");
      }

      //checking if the user exists
      const user = await User.findById(decode.id).select("-password");

      if (!user) {
        throw new Error("inValid token");
      }

      //setting the user in req object
      req.user = user;
      nxt();
    } catch (error) {
      console.log(error);
    }
  }
  if (!token) {
    // console.log(token);

    throw new Error("no token");
  }
};
