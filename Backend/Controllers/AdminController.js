import Quiz from "../Models/QuizModel.js";

export const AddQuiz = async (req, res) => {
  try {
    const { qn, ansOne, ansTwo, ansThree, ansFour, correctAnswer } =
      req.body.quiz;

    console.log(qn, ansOne, ansTwo, ansThree, ansFour, correctAnswer);

    if (!qn || !ansOne || !ansTwo || !ansThree || !ansFour || !correctAnswer)
      return res.status(404).json({
        success: false,
        message: "all fileds are mandatory",
      });

    const alreadyQn = await Quiz.find({ qn });

    if (alreadyQn?.length)
      return res.status(404).json({
        success: false,
        message: "quiz already added please add new one",
      });

    const newQuiz = new Quiz({
      qn,
      ansOne,
      ansTwo,
      ansThree,
      ansFour,
      correctAnswer,
    });

    await newQuiz.save();

    return res.status(201).json({
      success: true,
      message: "Quiz added Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
