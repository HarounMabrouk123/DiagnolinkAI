// ChatMessages.tsx
interface Message {
  sender: string;
  content: string;
  references?: string[];
}

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col space-y-4 px-4 py-0.5 overflow-y-auto max-h-[calc(100vh-200px)]">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`w-fit p-3 text-white ${
              message.sender === 'user' ? 'bg-red-600 rounded-xl' : 'bg-transparent text-gray-200 rounded-xl'
            }`}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          >
            {message.sender === 'bot' ? (
              <>
                <div className="font-semibold text-lg mb-4 text-left">
                  <span className="text-lg font-semibold">Answer:</span>
                  <p className="text-base">{message.content}</p>
                </div>

                {message.references && (
                  <>
                    <div className="font-semibold text-lg mb-2 text-left">
                      <span className="text-lg font-semibold">References:</span>
                    </div>
                    <div className="text-sm font-normal text-gray-400 text-left">
                      {message.references.map((ref, idx) => (
                        <div key={idx} className="mb-2">
                          {idx + 1}. {ref}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-white text-lg">{message.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
