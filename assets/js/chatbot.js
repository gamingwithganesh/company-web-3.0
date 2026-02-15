
    const chatPopup = document.getElementById("chat-popup");
    const chatHeader = document.getElementById("chat-header");

    // Configuration — Google Gemini API
    const GEMINI_API_KEY = 'AIzaSyCNeqzPL-CMQETGrLRFr3Y2QmGps5XvFxk';
    const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

    let isDragging = false, dragOffsetX, dragOffsetY;

    chatHeader.addEventListener("mousedown", function (e) {
      isDragging = true;
      dragOffsetX = e.clientX - chatPopup.offsetLeft;
      dragOffsetY = e.clientY - chatPopup.offsetTop;
    });
    document.addEventListener("mouseup", () => (isDragging = false));
    document.addEventListener("mousemove", function (e) {
      if (isDragging) {
        chatPopup.style.left = `${e.clientX - dragOffsetX}px`;
        chatPopup.style.top = `${e.clientY - dragOffsetY}px`;
      }
    });

    document.getElementById("userInput").addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });

    function toggleChat() {
      chatPopup.style.display = chatPopup.style.display === "flex" ? "none" : "flex";
    }

    function startVoiceInput() {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      const voiceBtn = document.getElementById("voice-btn");
      const input = document.getElementById("userInput");

      if (!recognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = function() {
        voiceBtn.classList.add("listening");
      };

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
      };

      recognition.onend = function() {
        voiceBtn.classList.remove("listening");
      };

      recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        voiceBtn.classList.remove("listening");
      };

      recognition.start();
    }

    async function sendMessage() {
      const input = document.getElementById("userInput");
      const userText = input.value.trim();
      if (!userText) return;

      const messages = document.getElementById("chat-messages");
      const userMsg = document.createElement("div");
      userMsg.textContent = "You: " + userText;
      messages.appendChild(userMsg);

      input.value = "";
      const botMsg = document.createElement("div");
      botMsg.className = "typing";
      botMsg.textContent = "AI assistant is typing...";
      messages.appendChild(botMsg);

      try {
        // Call Gemini API directly
        const systemPrompt = `You are Nexa , Z INTECH SupportBot - a professional, friendly, and knowledgeable AI assistant representing Z INTECH PVT LTD.

ABOUT Z INTECH:
Z INTECH is a trusted IT company offering:
- Web Development (static, dynamic, e-commerce websites)
- App Development (Android, iOS, cross-platform)
- UI/UX Design (wireframing, prototyping, user interface enhancement)
- Software Application Development
- NLP & Voice AI Integration
- AI Integration in Web & App Development
- AI-Powered Design Tools
- Digital Marketing
- Graphic Design
- Free IT Consultation
- Project Planning & Quotation

CONTACT INFORMATION:
Location: Sudampuri, Wardha, Maharashtra 442001
Phone: +91 8010449610
Email: zintech04@gmail.com, hr@zintech04.com

INSTRUCTIONS:
- Be professional, friendly, and approachable
- Provide clear, concise answers (40-50 words max per response)
- If user is unsure what they need, guide them by explaining available services
- Suggest free IT consultation as a starting point when appropriate
- Always include relevant contact info when suggesting next steps
- Use plain text only - no asterisks, markdown, or special formatting
- Be efficiency-focused and business-minded`;
        
        const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: systemPrompt },
                  { text: userText }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 256
            }
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          console.error('Gemini API error:', response.status, errData);
          botMsg.classList.remove("typing");
          botMsg.textContent = `AI assistant: Error ${response.status} - ${errData?.error?.message || 'Unknown error'}`;
          messages.scrollTop = messages.scrollHeight;
          return;
        }

        const data = await response.json();
        console.debug('Gemini response:', data);
        
        // Extract text from response
        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
        
        botMsg.classList.remove("typing");
        botMsg.textContent = "AI assistant: " + responseText;
      } catch (err) {
        console.error('Chatbot error:', err);
        botMsg.classList.remove("typing");
        botMsg.textContent = "AI assistant: Connection error — please try again later.";
      }

      messages.scrollTop = messages.scrollHeight;
    }
  
