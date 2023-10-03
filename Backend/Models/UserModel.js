import mongoose, { Schema } from "mongoose";

const userShcema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "user"],
    default: "user",
  },
  answer: {
    type: [Object],
  },
});

export default mongoose.model("User", userShcema);
