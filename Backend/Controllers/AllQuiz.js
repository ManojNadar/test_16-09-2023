import Quiz from "../Models/QuizModel.js";

export const AllQuiz = async (req, res) => {
  try {
    const allQuiz = await Quiz.find({});

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
    const { answer, qnId } = req.body;

    console.log(answer);

    if (!answer)
      return res.status(404).json({
        success: false,
        message: "answer is required",
      });

    // console.log(quiz);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const singleQuiz = async (req, res) => {
  try {
    const { qnId } = req.body;

    console.log(qnId);

    if (!qnId)
      return res.status(404).json({
        success: false,
        message: "answer is required",
      });

    const quiz = await Quiz.findById(qnId);

    if (quiz) {
      return res.status(200).json({
        success: false,
        singleQuiz: quiz,
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
