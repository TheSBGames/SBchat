export default function ChatMessage({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      className={`w-full px-6 py-4 text-sm ${
        isUser ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="font-semibold mb-1">{isUser ? "You" : "SBChat"}</div>
      <div>{content}</div>
    </div>
  );
}
