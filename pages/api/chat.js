import { getSession } from "next-auth/react";
import dbConnect from "../../lib/db";
import Chat from "../../models/Chat";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  await dbConnect();
  const { messages, model, chatId } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: model || "gpt-4",
      messages,
    });

    const assistantReply = response.choices[0].message;

    await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: [
            messages[messages.length - 1], // user message
            assistantReply,               // assistant reply
          ],
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: assistantReply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OpenAI API error" });
  }
}
