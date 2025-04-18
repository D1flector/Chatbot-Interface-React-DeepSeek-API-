const StartScreen = ({ setStart }) => {
  return (
    <div className="start-container">
      <p className="start-name">AI INTERFACE</p>
      <p className="start-subtitle">Твой помощник на базе искусственного интеллекта</p>
      <button className="start-btn" onClick={() => setStart(false)}>Начать</button>
    </div>
  );
};

export default StartScreen;
