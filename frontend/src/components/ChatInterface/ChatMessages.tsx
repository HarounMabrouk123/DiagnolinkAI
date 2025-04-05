export default function ChatMessages({ messages }: { messages: { sender: string, content: string }[] }) {
  return (
    <div className="flex flex-col space-y-4 px-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === 'user' ? ' justify-end' : ' justify-start'}`}
        >
          <div
            className={` w-fit p-4 text-white text-left ${message.sender === 'user' ? 'bg-red-600 rounded-xl' : 'bg-[#1a1a1a] rounded-xl'}`}
            style={{wordBreak:'break-word'}}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
