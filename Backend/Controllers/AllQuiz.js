import Quiz from "../Models/QuizModel.js";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const AllQuiz = async (req, res) => {
  try {
    const { page, limit = 1 } = req.body;

    // console.log(page);

    const skipValue = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    const allQuiz = await Quiz.find({})
      .skip(skipValue)
      .limit(limitValue)
      .lean();

    if (allQuiz?.length) {
      return res.status(200).json({
        success: true,
        allQuiz: allQuiz,
      });
    }
    return res.status(404).json({
      success: false,
      message: "No Quiz Found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const SolveQuiz = async (req, res) => {
  try {
    const { id, qn, crtAns, userAns, token } = req.body;

    console.log(id, qn, crtAns, userAns, token);

    if (!id || !qn || !crtAns || !userAns) {
      return res.status(404).json({
        success: false,
        message: "all details are mandatory",
      });
    }
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "token is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "not a valid token",
      });
    }

    const userId = decodeToken?.userId;
    // console.log(userId);
    const user = await User.findById(userId);
    // console.log(user);

    const findQuiz = await Quiz.findById(id);
    // console.log(findQuiz);

    if (findQuiz) {
      const ansObj = {
        qn,
        userAns,
      };

      user.answer.push(ansObj);
      // await user.save();

      return res.status(200).json({
        success: true,
        message: "answer submitted",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "no quiz found",
      });
    }

    // console.log(quiz);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
