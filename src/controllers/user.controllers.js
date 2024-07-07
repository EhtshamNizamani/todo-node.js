import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
const register = asyncHandler(async (req, res) => {
  const { password, name, email } = req.body;
  console.log(req.body);

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "This user is already register");
  }
  const user = await User.create({ email, password, name });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  res.status(200).json(new ApiResponse(201, createdUser, "Success"));
});

export { register };
