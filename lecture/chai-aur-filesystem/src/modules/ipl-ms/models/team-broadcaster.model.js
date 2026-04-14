import mongoose from "mongoose";

const teamBraodcasterSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is required"],
    },
    broadcasterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broadcaster",
      required: [true, "Broadcaster is required"],
    },
  },
  {
    timestamps: true,
  }
);

teamBraodcasterSchema.index({ teamId: 1, broadcasterId: 1 }, { unique: true });

export default mongoose.model("TeamBroadcaster", teamBraodcasterSchema);
