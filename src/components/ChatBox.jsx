import { useState } from 'react';

function ChatBox({ messages, sendMessage }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 h-full">
      <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="my-2">
            <div>{msg}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border p-2"
          placeholder="Type a message"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2">Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
