// --- DOM Element Selection ---
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatToggle = document.getElementById('chat-toggle');
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        
        // --- Knowledge Base: Services Offered ---
        const servicesInfo = {
            general: "We offer a wide range of IT services, including: Web Development (static, dynamic, e-commerce), App Development (Android, iOS, cross-platform), UI/UX Design, Software Application Development, and various AI integration services.if anything else please contact us by this email:hr@zintech04.com",
            web: "We build all kinds of websites! This includes static sites for simple online presence, dynamic sites with content management systems, and full-featured e-commerce platforms.",
            app: "We develop high-quality mobile apps for Android, iOS, and cross-platform solutions to reach a wider audience with a single codebase. What kind of app are you looking to build?",
            ui_ux: "Our UI/UX design services focus on creating intuitive and beautiful user experiences. We handle everything from wireframing and prototyping to enhancing the user interface of existing products.",
            software: "We develop custom software applications tailored to your specific business needs, helping you streamline operations and improve efficiency.",
            ai: "We specialize in AI! Our services include NLP & Voice AI Integration, adding AI features to web and apps, AI-powered design tools, creating custom AI assistants, and using AI for SEO optimization.",
            consultation: "Yes, we offer a free IT consultation! It's a great way for us to understand your project and for you to learn how we can help. Would you like to schedule one?",
            price: "The cost of a project varies depending on its complexity, features, and timeline. The best way to get an accurate price is through our free consultation and project planning service. We can provide a detailed, no-obligation quotation.",
            contact: "You can reach our human team by scheduling a free consultation or by emailing us at zintech04gmail.com, contact-8010449610 For a detailed discussion, the consultation is the best starting point!"
        };

        // --- Event Listeners ---
        
        // Toggle chatbot window
        chatToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });

        // Send message on button click
        sendBtn.addEventListener('click', sendMessage);

        // Send message on 'Enter' key press
        userInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevents new line in input
                sendMessage();
            }
        });

        // --- Functions ---

        // Main function to handle sending a message
        function sendMessage() {
            const messageText = userInput.value.trim();
            if (messageText === '') return;

            // Display user's message
            addMessage(messageText, 'user-message');
            userInput.value = '';

            // Generate and display bot's response
            setTimeout(() => {
                const botResponse = getBotResponse(messageText);
                addMessage(botResponse, 'bot-message');
            }, 1000); // Simulate bot thinking
        }

        // Add a message to the chat display
        function addMessage(text, className) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', className);
            messageElement.textContent = text;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
        }

        // The "Brain" of the chatbot
        function getBotResponse(inputText) {
            const lowerInput = inputText.toLowerCase();

            if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                return "Hello! How can I help you today?";
            }
            if (lowerInput.includes('services') || lowerInput.includes('what do you do') || lowerInput.includes('offer')) {
                return servicesInfo.general;
            }
            if (lowerInput.includes('website') || lowerInput.includes('web development')) {
                return servicesInfo.web;
            }
            if (lowerInput.includes('app') || lowerInput.includes('mobile')) {
                return servicesInfo.app;
            }
            if (lowerInput.includes('ui') || lowerInput.includes('ux') || lowerInput.includes('design')) {
                return servicesInfo.ui_ux;
            }
             if (lowerInput.includes('software')) {
                return servicesInfo.software;
            }
            if (lowerInput.includes('ai') || lowerInput.includes('nlp') || lowerInput.includes('voice')) {
                return servicesInfo.ai;
            }
            if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('how much')) {
                return servicesInfo.price;
            }
            if (lowerInput.includes('quotation') || lowerInput.includes('quote') || lowerInput.includes('planning')) {
                return "We provide detailed project planning and quotations. This is typically part of our free consultation process. Would you like me to help you connect with our team for one?";
            }
            if (lowerInput.includes('consultation') || lowerInput.includes('free')) {
                return servicesInfo.consultation;
            }
            if (lowerInput.includes('contact') || lowerInput.includes('talk to a human') || lowerInput.includes('team')) {
                return servicesInfo.contact;
            }
             if (lowerInput.includes('bye') || lowerInput.includes('thank you') || lowerInput.includes('thanks')) {
                return "You're welcome! Is there anything else I can help you with today? Feel free to ask for a free consultation to speak with our experts.";
            }

            // Fallback response
            return "I'm not quite sure how to answer that. I can help with questions about our services like Web Development, App Development, UI/UX, and AI Integration. For more specific queries, I recommend our free IT consultation., is any thing else please contact over expert , email:zintech04gmail.com, number:8010449610";
        }