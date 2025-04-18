import { useState } from 'react';
import { sendToAI } from './api.js';
import StartScreen from './StartScreen.jsx';
import ChatInterface from './ChatInterface.jsx';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(true);


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

  return ( started
    ? <StartScreen setStart={setStarted}/>
    : <ChatInterface 
      messages={messages}
      input={input}
      handleSend={handleSend}
      loading={loading}
      setInput={setInput}
  />
  ) 
}

export default App;
