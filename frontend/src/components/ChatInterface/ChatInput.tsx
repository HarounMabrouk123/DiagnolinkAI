import { Send } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex items-center bg-[#111111] border border-[#2a2a2a] rounded-2xl px-4 py-3 shadow-md focus-within:ring-1 focus-within:ring-red-500 transition">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-sm"
        />

        <button className="ml-3 bg-red-600 hover:bg-red-700 p-3 rounded-xl shadow-md transition">
          <Send className="text-white w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
