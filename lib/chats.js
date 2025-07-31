import { connectToDatabase } from "./db";
import Chat from "@/models/Chat";

export async function getUserChats(userEmail) {
  await connectToDatabase();
  const chats = await Chat.find({ userEmail }).sort({ createdAt: -1 });
  return chats;
}

export async function saveChatMessage(chatId, userEmail, message) {
  await connectToDatabase();

  const chat = await Chat.findOne({ _id: chatId, userEmail });

  if (chat) {
    chat.messages.push(message);
    await chat.save();
    return chat;
  }

  // Create new chat
  const newChat = await Chat.create({
    _id: chatId,
    userEmail,
    title: message.content.slice(0, 30),
    messages: [message],
  });

  return newChat;
}
