import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

const generateAccessTokenAndRefreshToken = async function (_id) {
  const user = await User.findById(_id);

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

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

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid user!");
  }
  const isCorrectPassword = await user.isPasswordValid(password);
  if (!isCorrectPassword) {
    throw new ApiError(400, "Wrong password");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!loggedInUser) {
    throw new ApiError(400, "Invalid user credential");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);
  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  const data = await User.findByIdAndUpdate(req.user?._id, {
    $unset: {
      refreshToken: 1,

      new: true,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(201, data, "User logged out successfully"));
});
export { register, login, logout };
