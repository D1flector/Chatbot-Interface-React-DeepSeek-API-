const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function sendToAI(userMessage) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Ошибка при вызове API:", data);
    throw new Error(data.error?.message || "Что-то пошло не так");
  }

  return data.choices?.[0]?.message?.content || "Ответ пустой";
}
