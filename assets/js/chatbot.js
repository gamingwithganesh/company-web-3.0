
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatbot = document.getElementById('chatbot-container');
  toggleBtn.addEventListener('click', () => {
    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
      chatbot.style.display = 'block';
    } else {
      chatbot.style.display = 'none';
    }
  });
});


const API_KEY = "AIzaSyA1Yaz-CN213YNgs4Etrw5CXii8Sn1aKcg";
const chatbox = document.getElementById("chatbox");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("You", userText, "user");
  input.value = "";

   const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA1Yaz-CN213YNgs4Etrw5CXii8Sn1aKcg",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
  {
    role: "user",
    parts: [
      {
        text: "You are an AI assistant for Z INTECH Pvt Ltd, a company that provides web development, digital marketing, and IT consulting services. Z INTECH is known for client-centric, customized solutions focused on growth, innovation, and support."
      }
    ]
  },
  {
    parts: [
      {
        text: userText
      }
    ]
  }
]
      })
    }
  );

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
  addMessage("AI Assistant", reply, "bot");
}

function addMessage(sender, text, cls) {
  const msg = document.createElement("div");
  msg.className = cls;
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}
