import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  role: { type: String, required: true }, // "user" or "assistant"
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema(
  {
    _id: String,
    userEmail: { type: String, required: true },
    title: { type: String },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
