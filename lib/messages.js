import { connectToDatabase } from "./db";
import Chat from "@/models/Chat";

export async function getMessages(chatId, userEmail) {
  await connectToDatabase();

  const chat = await Chat.findOne({ _id: chatId, userEmail });
  return chat ? chat.messages : [];
}
