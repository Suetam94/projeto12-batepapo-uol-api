import { Schema, model } from "mongoose";

const MessagesSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["status", "private_message", "message"],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export default model("Messages", MessagesSchema);
