import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ChatSidebar({ chats = [], onNewChat }) {
  return (
    <aside className="w-64 bg-gray-950 text-white h-full flex flex-col border-r border-gray-800">
      <div className="p-4 font-bold text-xl border-b border-gray-800">SBChat</div>
      <button
        className="p-3 text-sm bg-blue-700 hover:bg-blue-800 m-4 rounded-xl"
        onClick={onNewChat}
      >
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto px-4">
        {chats.map((chat, i) => (
          <div key={i} className="py-2 text-gray-300 truncate">{chat.title || `Chat #${i + 1}`}</div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-800 text-sm">
        <button onClick={() => signOut()} className="text-red-400 hover:underline">
          Log out
        </button>
      </div>
    </aside>
  );
}
