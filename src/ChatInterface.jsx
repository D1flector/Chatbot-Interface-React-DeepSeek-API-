import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatInterface = ( { messages, input, setInput, handleSend, loading } ) => {
  return (
    <div className="container">
      <h1>AI Чат</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Ждём ответ...' : 'Отправить'}
        </button>
      </div>
        </div>
      );
}

export default ChatInterface;