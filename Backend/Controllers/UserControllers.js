import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body.user;
    // console.log(name, email, password, role);

    if (!name || !email || !password || !role)
      return res.status(404).json({
        success: false,
        message: "all fileds are mandatory",
      });

    const isEmailExist = await User.find({ email });

    if (isEmailExist?.length)
      return res.status(404).json({
        success: false,
        message: "email already exist Please try login",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
      role,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Registered Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    if (!email || !password)
      return res.status(404).json({
        success: false,
        message: "all fileds are mandatory",
      });

    const user = await User.findOne({ email: email });

    if (user) {
      const rightPassword = await bcrypt.compare(password, user.password);

      if (rightPassword) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        const userObj = {
          name: user.name,
          email: user.email,
          role: user.role,
        };

        return res.status(200).json({
          success: true,
          message: "Logged in Success",
          user: userObj,
          token: token,
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "not a valid user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Currentuser = async (req, res) => {
  try {
    const { token } = req.body;

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

    if (user) {
      const userObj = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return res.status(200).json({
        success: true,
        message: "currentuser",
        currentuser: userObj,
      });
    }

    return res.status(404).json({
      success: false,
      message: "not a valid user",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
