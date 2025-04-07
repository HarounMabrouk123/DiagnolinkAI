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

  // Define the generated answer
  const generatedAnswer = "Les symptômes du diabète de type 2 comprennent une forte soif, un fort besoin d'uriner souvent, des douleurs aux yeux, de la fatigue, de la céphalée et de la polyurie. Ces symptômes peuvent être accompagnés de blessures lentes à guérir sur les pieds ou dans d'autres parties du corps...";

  // Define the retrieved data array
  const retrievedData = [
    "Page 9 from data\\20 diabete.pdf : B. LE DIABETE DE TYPE 2 (DT2) 1. Epidémiologie du DT2 : Le diabète sucré est la maladie métabolique la plus fréquente. Selon l’IDF, on estime qu’il existe actuellement 420 millions de diabétiques...",
    "Page 15 from data\\20 diabete.pdf : et la 28ème semaine d’aménorrhée. Si le diagnostic est posé avant la 17ème semaine, il s’agit plus probablement d’un diabète de type 2 antérieur à la grossesse et méconnu.",
    "Page 0 from data\\20 diabete.pdf : type (Diabète de type 1, Diabète de type 2, Diabète secondaire, Diabète gestationnel). 6. Décrire les conséquences physiopathologiques de l’hyperglycémie."
  ];

  // Combine the generated answer and the retrieved data into one array
  const botResponseArray = [generatedAnswer, ...retrievedData];

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
          <div className="w-full h-full max-w-[95%] md:max-w-[70%] mx-3 overflow-hidden">
            <ChatMessages messages={messages} botResponseArray={botResponseArray} />
          </div>
        )}
      </div>
  
      <ChatInput handleSendMessage={handleSendMessage} />
    </main>
  );
}
