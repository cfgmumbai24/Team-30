import { useEffect } from 'react';

const Chatbot = () => {
  debugger;
  useEffect(() => {
    // Set the global configuration for the chatbot
    window.embeddedChatbotConfig = {
      chatbotId: 'JFRJICqhod3JDb-CrfQ_y',
      domain: 'www.chatbase.co',
    };

    // Function to load the Chatbase script
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://www.chatbase.co/embed.min.js';
        script.setAttribute('chatbotId', 'JFRJICqhod3JDb-CrfQ_y');
        script.setAttribute('domain', 'www.chatbase.co');
        script.defer = true;

        script.onload = () => {
          resolve();
        };

        script.onerror = () => {
          reject(new Error('Failed to load the script'));
        };

        document.body.appendChild(script);
      });
    };

    // Load the script and handle potential errors
    loadScript().catch((error) => {
      console.error(error.message);
    });

    // Cleanup script on component unmount
    return () => {
      const scripts = document.querySelectorAll('script[src="https://www.chatbase.co/embed.min.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null; // This component does not render any HTML
};

export default Chatbot;
