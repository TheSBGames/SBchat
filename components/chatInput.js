import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await onSend(message.trim());
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2 p-4 bg-gray-900">
      <input
        className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-xl focus:outline-none"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
}
