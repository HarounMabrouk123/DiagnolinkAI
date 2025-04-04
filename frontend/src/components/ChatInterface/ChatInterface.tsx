// components/ChatInterface/ChatInterface.tsx
import ChatHeader from "./ChatHeader";
import ChatIntro from "./ChatIntro";
import ChatActions from "./ChatActions";
import ChatInput from "./ChatInput";
import Heartbeat from "./Heartbeat";

export default function ChatInterface() {
  return (
    <main className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_#000000_0%,_#1a0000_60%,_#1a0000_100%)] text-white p-10 flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center justify-center text-center w-full">
          <ChatHeader />
          <ChatIntro />
          <ChatActions />
          <Heartbeat />
        </div>
      </div>

      <ChatInput />
    </main>
  );
}
