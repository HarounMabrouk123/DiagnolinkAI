// components/ChatInterface/ChatHeader.tsx
import { Menu } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className=" absolute top-4 left-6 flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium text-white flex items-center gap-2">
        <Menu className="w-5 h-5" />
        Messages
      </h2>
    </div>
  );
}
