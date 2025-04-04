// components/ChatInterface/ChatActions.tsx
export default function ChatActions() {
    const actions = [
      { label: "Describe Symptoms", icon: "🩺" },
      { label: "Upload File", icon: "📁" },
      { label: "Ask a Question", icon: "📨" },
    ];
  
    return (
      <div className="flex gap-6 mb-10">
        {actions.map((action) => (
          <div
            key={action.label}
            className="bg-[#111111] hover:bg-red-900 transition rounded-xl p-6 text-white w-48 text-center shadow-md cursor-pointer"
          >
            <div className="text-3xl mb-2">{action.icon}</div>
            <div className="text-sm font-medium">{action.label}</div>
          </div>
        ))}
      </div>
    );
  }
  