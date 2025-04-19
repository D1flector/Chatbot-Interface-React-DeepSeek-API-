import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatInterface = ( { messages, input, setInput, handleSend, loading } ) => {
  const [typingDots, setTypingDots] = useState('');

  useEffect(() => {
    if (!loading) {
      setTypingDots('');
      return;
    }

    const interval = setInterval(() => {
      setTypingDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval)
  }, [loading])

  return (
    <div className="container">
      <h1>AI Чат</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && (<div className="message ai">AI печатает{typingDots}</div>)}
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