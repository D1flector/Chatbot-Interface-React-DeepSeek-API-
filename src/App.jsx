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
    if (!input.trim()) return;
  
    setLoading(true);
  
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
  
    const fullContext = newMessages
      .map(msg => `${msg.role === 'user' ? 'Пользователь' : 'AI'}: ${msg.content}`)
      .join('\n');
  
    try {
      const reply = await sendToAI(fullContext);
      setMessages([...newMessages, { role: 'ai', content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'ai', content: 'Произошла ошибка, попробуйте снова.' }]);
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
