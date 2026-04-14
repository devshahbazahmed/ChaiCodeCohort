import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Owner", ownerSchema);
