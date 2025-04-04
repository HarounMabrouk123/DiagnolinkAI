// src/app/page.tsx
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface/ChatInterface";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gradient-to-b from-black via-[#1a0000] to-black text-white ">
      <Sidebar />
      <ChatInterface />
    </div>
  );
}