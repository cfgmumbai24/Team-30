import React from 'react'
// import Chatbot from '../components/Chatbot'
import useScript from '../components/useScript';

const Home = () => {
    const [loaded, error] = useScript('https://www.chatbase.co/embed.min.js', {
        chatbotId: 'JFRJICqhod3JDb-CrfQ_y',
        domain: 'www.chatbase.co',
      });
    
      if (error) {
        return <div>Error loading chatbot script</div>;
      }
    
      return (
        <>
          <div>home</div>
          {loaded && <div>Chatbot is ready</div>}
        </>
      );
}

export default Home