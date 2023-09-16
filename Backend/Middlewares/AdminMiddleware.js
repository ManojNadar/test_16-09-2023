import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const AdminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.body;
    // console.log(token);

    if (!token)
      return res.status(404).json({
        success: false,
        message: "token is required",
      });

    const decodeData = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeData)
      return res.status(404).json({
        success: false,
        message: "not a valid token",
      });

    const userId = decodeData?.userId;

    const user = await User.findById(userId);

    if (user?.role != "Admin") {
      return res.status(404).json({
        success: false,
        message: "not a valid user",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
