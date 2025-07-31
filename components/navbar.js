import { signOut } from "next-auth/react";

export default function Navbar({ user }) {
  return (
    <nav className="w-full px-6 py-4 bg-gray-900 text-white flex justify-between items-center border-b border-gray-800">
      <div className="text-lg font-bold">SBChat</div>
      <div className="flex gap-4 items-center">
        <span className="text-sm">{user?.email}</span>
        <button
          onClick={() => signOut()}
          className="text-red-400 hover:underline text-sm"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
