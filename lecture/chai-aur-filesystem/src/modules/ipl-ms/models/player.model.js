import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    roles: {
      type: [
        {
          type: String,
          enum: ["batsman", "bowler", "all-rounder", "wicket-keeper"],
        },
      ],
      validate: [(val) => val.length > 0, "At least one role is required"],
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Player", playerSchema);
