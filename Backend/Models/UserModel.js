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
    enum: ["Admin", "Student"],
    default: "Student",
  },
});

export default mongoose.model("User", userShcema);
