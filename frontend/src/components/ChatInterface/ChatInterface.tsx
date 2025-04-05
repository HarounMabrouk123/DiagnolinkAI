'use client';

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatIntro from "./ChatIntro";
import ChatActions from "./ChatActions";
import ChatInput from "./ChatInput";
import Heartbeat from "./Heartbeat";
import ChatMessages from "./ChatMessages";

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]); // Store messages
  const [messageSent, setMessageSent] = useState<boolean>(false); // Track message sending state

  // Handle sending user message and chatbot response
  const handleSendMessage = (userMessage: string) => {
    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: userMessage }
    ]);

    // Simulate bot response with a delay
    setMessageSent(true); // Hide the initial sections once the message is sent

    const chatbotResponse = "This is a simulated bot response!";
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: chatbotResponse }
      ]);
    }, 1000); // Simulate response delay
  };

  return (
    <main className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_#000000_0%,_#1a0000_60%,_#1a0000_100%)] text-white p-10 flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        {!messageSent ? (
          // Show sections before message is sent
          <div className="flex flex-col items-center justify-center text-center w-full">
            <ChatHeader />
            <ChatIntro />
            <ChatActions />
            <Heartbeat />
          </div>
        ) : (
          // Once message is sent, only show chat messages
          <div className="w-full h-full max-w-2xl mx-auto overflow-hidden">
            <ChatMessages messages={messages} />
          </div>
        )}
      </div>

      <ChatInput handleSendMessage={handleSendMessage} />
    </main>
  );
}
