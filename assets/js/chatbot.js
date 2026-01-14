
    const chatPopup = document.getElementById("chat-popup");
    const chatHeader = document.getElementById("chat-header");
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
      botMsg.textContent = "Zoe is typing...";
      messages.appendChild(botMsg);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer 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", "Content-Type": "application/json" },
        body: JSON.stringify({
          "model": "anthropic/claude-3-haiku",
          "messages": [
            {"role": "system", "content": "You are Nexa Z, You are Z INTECH SupportBot, a professional, friendly, and knowledgeable Al assistant representing Z INTECH PVT LTD, a trusted IT company. Your job is to assist clients and website visitors with information about the company's services. Always be polite, helpful, and clear in your responses,Z INTECH offers:Web Development (static, dynamic, e-commerce websites) ,App Development (Android, iOs, cross-platform),UI/UX Design (wireframing, prototyping, user interface enhancement),Software Application Development ,NLP & Voice Al Integration, Al Integration in Web & App Development, Al-Powered Design Tools, Al Assistance Development ,Al for SEO Optimization , Free IT Consultation , Project Planning & Quotation ,Web Design,   Digital Marketing, Graphic Design,Z INTECH Contact Information :Location: Sudampuri, Wardha, Maharashtra, 442001 Phone: +91 8010449610, +91 7038694471 Email: zintech04@gmail.com and hr@zintech04.com , Your tone must be:Friendly but professional Supportive and approachable Efficient and business-focused f a user is unsure what they want, guide them by explaining the available services and suggesting the best starting point (like a free consultation).Respond professionally using plain text only. Limit replies to 40–50 words. Include all important information clearly, and do not use * or ** anywhere in the response. "},
            {"role": "user", "content": userText}
          ]
        })
      });

      const data = await response.json();
      botMsg.classList.remove("typing");
      botMsg.textContent = "Zoe: " + (data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.");
      messages.scrollTop = messages.scrollHeight;
    }
  
