// src/components/Sidebar.tsx
import {
  Menu,
  ClipboardList,
  User,
  Pencil,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black py-6 px-4 flex flex-col justify-between h-screen">
      <div className="space-y-4">
        {/* Brand */}
        <div className="bg-[#1a1a1a] rounded-lg px-3 py-2 flex items-center gap-3">
          <Pencil className="text-red-500 w-4 h-4" />
          <span className="text-white text-sm font-medium">Diagnolink AI</span>
        </div>

        {/* Navigation */}
        <div className="bg-[#1a1a1a] rounded-lg px-2 py-3 space-y-2 text-sm text-white">
          <NavItem icon={<Menu className="w-4 h-4" />} label="Messages" />
          <NavItem icon={<ClipboardList className="w-4 h-4" />} label="Medical History" />
          <NavItem icon={<User className="w-4 h-4" />} label="Profile" />
        </div>
      </div>

      {/* New Chat Button */}
      <button className="bg-red-600 hover:bg-red-700 transition rounded-lg text-white text-sm font-medium py-3">
        New Chat
      </button>
    </aside>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] rounded-md cursor-pointer transition">
      {icon}
      <span>{label}</span>
    </div>
  );
}
