import { Schema, model } from "mongoose";

const ParticipantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastStatus: {
    type: Date,
    default: Date.now,
  },
});

export default model("Participant", ParticipantSchema);
