export default function ChatMessages({ messages }: { messages: { sender: string, content: string }[] }) {
    return (
      <div className="flex flex-col w-full h-full max-h-[calc(100vh-200px)] overflow-y-auto pr-4 space-y-4">
        <div className="space-y-4 px-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-xs mx-auto p-3 rounded-lg text-white ${message.sender === 'user' ? 'bg-blue-500' : 'bg-red-500'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
  