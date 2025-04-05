'use client';  // Mark as a client component

import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  handleSendMessage: (message: string) => void; // Function to handle sending the message
}

export default function ChatInput({ handleSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value); // Update the input value
  };

  const handleSend = () => {
    if (message.trim()) {
      handleSendMessage(message); // Send the message when the button is clicked
      setMessage(""); // Clear the input field
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage(message); // Send the message when Enter is pressed
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex items-center bg-[#111111] border border-[#2a2a2a] rounded-2xl px-4 py-3 shadow-md focus-within:ring-1 focus-within:ring-red-500 transition">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-sm"
          value={message}
          onChange={handleChange} // Update message input
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
        <button
          className="ml-3 bg-red-600 hover:bg-red-700 p-3 rounded-xl shadow-md transition"
          onClick={handleSend} // Handle send button click
        >
          <Send className="text-white w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
