import mongoose from "mongoose";

const PremiumUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    plan: {
      type: String,
      enum: ["10min", "1month", "3month", "6month", "1year", "permanent"],
      default: "1month",
    },
    expiresAt: { type: Date }, // auto-managed on grant
  },
  { timestamps: true }
);

export default mongoose.models.PremiumUser ||
  mongoose.model("PremiumUser", PremiumUserSchema);
