import React from 'react'
// import Chatbot from '../components/Chatbot'
import useScript from '../components/useScript';
import homepic from '../assets/home.png';
import '../styles/home.scss'
import { Link } from 'react-router-dom';

const Home = () => {
    const [loaded, error] = useScript('https://www.chatbase.co/embed.min.js', {
        chatbotId: 'JFRJICqhod3JDb-CrfQ_y',
        domain: 'www.chatbase.co',
      });
      const moduleTitle = "Module 1";
    
      if (error) {
        return <div>Error loading chatbot script</div>;
      }
    
      return (
        <>
          <div className='home'>
            <img src={homepic}></img>
            <div>
                <h2>Hi, don't walk into tomorrow without financial knowledge</h2>
                <p>Start learning about personal finance, today! Pick a topic of your interest from below.</p>
            </div>
          </div>
          <div className='module'>
            <h1>Modules</h1>
            <Link to="/modules">
            <div className='module-card'>
                <h3>{moduleTitle}</h3>
                <p>Module Subtitle</p>
            </div>
            </Link>
          </div>
          {loaded && <div>Chatbot is ready</div>}
        </>
      );
}

export default Home