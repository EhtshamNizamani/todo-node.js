import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

const jwtToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);

  if (!token) {
    throw new ApiError(401, "Unauthorized user");
  }

  const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decodeToken) {
    throw new ApiError(401, "Unauthorized user");
  }
  const user = await User.findById(decodeToken._id);
  req.user = user;
  next();
};

export { jwtToken };
