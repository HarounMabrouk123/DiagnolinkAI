// ChatInterface.tsx
'use client';

import { useState } from "react";
import axios from "axios";
import ChatHeader from "./ChatHeader";
import ChatIntro from "./ChatIntro";
import ChatActions from "./ChatActions";
import ChatInput from "./ChatInput";
import Heartbeat from "./Heartbeat";
import ChatMessages from "./ChatMessages";
import LoadingHeartBeat from "./LoadingHeartBeat";


interface Message {
  sender: "user" | "bot";
  content: string;
  references?: string[];
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (userMessage: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: userMessage },
    ]);

    setMessageSent(true);
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/query", {
        question: userMessage,
      });

      const answer = response.data.response;
      const sources = response.data.sources.map(
        (src: any) => `Page ${src.page} from ${src.source} : ${src.content}`
      );

      let currentText = "";
      const words = answer.split(" ");
      let wordIndex = 0;

      const interval = setInterval(() => {
        currentText += words[wordIndex] + " ";
        wordIndex++;

        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.sender === "bot") {
            updated[updated.length - 1].content = currentText;
          } else {
            updated.push({ sender: "bot", content: currentText });
          }
          return updated;
        });

        if (wordIndex >= words.length) {
          clearInterval(interval);
          setIsLoading(false);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].references = sources;
            return updated;
          });
        }
      }, 50);

    } catch (error) {
      console.error("Error fetching response from Flask server:", error);
      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: "❌ An error occurred while fetching the response." },
      ]);
    }
  };

  return (
    <main className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_#000000_0%,_#1a0000_60%,_#1a0000_100%)] text-white p-10  flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        {!messageSent ? (
          <div className="flex flex-col items-center justify-center text-center w-full">
            <ChatHeader />
            <ChatIntro />
            <ChatActions />
            <Heartbeat />
          </div>
        ) : (
          <div className="w-full max-w-[95%] md:max-w-[70%] mx-3 overflow-y-auto flex-1 min-h-0">
            <ChatMessages messages={messages} />
            {isLoading && (
                <div className="w-full flex justify-start px-4 py-2">
                  <LoadingHeartBeat />
                </div>
                     )}
          </div>
        )}
      </div>

      <ChatInput handleSendMessage={handleSendMessage} />
    </main>
  );
}