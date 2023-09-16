import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema({
  qn: {
    type: String,
    required: true,
  },
  ansOne: {
    type: String,
    required: true,
  },
  ansTwo: {
    type: String,
    required: true,
  },
  ansThree: {
    type: String,
    required: true,
  },
  ansFour: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Quiz", quizSchema);
