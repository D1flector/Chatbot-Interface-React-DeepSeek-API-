import { useState } from 'react';
import { sendToAI } from './api.js';
import ReactMarkdown from 'react-markdown';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return; // Проверяем, что ввод не пустой

    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: input }]);

    try {
      const reply = await sendToAI(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'ai', content: reply }
      ]);
    } catch (error) {
      console.error(error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'ai', content: 'Произошла ошибка, попробуйте снова.' }
      ]);
    } finally {
      setLoading(false);
    }

    setInput('');
  };

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

export default App;
