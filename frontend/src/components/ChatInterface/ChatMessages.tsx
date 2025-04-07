export default function ChatMessages({
  messages,
  botResponseArray,
}: {
  messages: { sender: string; content: string }[];
  botResponseArray: string[];
}) {
  return (
    <div className="flex flex-col space-y-4 px-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`w-fit p-3 text-white ${
              message.sender === 'user' ? 'bg-red-600 rounded-xl' : 'bg-transparent text-gray-200 rounded-xl'
            }`}
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }} // Font change
          >
            {message.sender === 'bot' && (
              <>
                {/* Coherent sentence (LLM-generated answer) */}
                <div className="font-semibold text-lg mb-4 text-left">
                  <span className="text-lg font-semibold">Answer:</span>
                  <p className="text-base">{botResponseArray[0]}</p>
                </div>

                {/* Reference section */}
                <div className="font-semibold text-lg mb-2 text-left">
                  <span className="text-lg font-semibold">Reference:</span>
                </div>

                {/* Iterate through retrieved data */}
                <div className="text-sm font-normal text-gray-400 text-left">
                  {botResponseArray.slice(1).map((reference, idx) => (
                    <div key={idx} className="mb-2"> {/* Add margin-bottom between each reference */}
                      {idx + 1}. {reference}
                    </div>
                  ))}
                </div>
              </>
            )}

            {message.sender === 'user' && (
              // Display the user's message
              <p className="text-white text-lg">{message.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
