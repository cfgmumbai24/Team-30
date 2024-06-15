import { useState, useRef } from 'react';

const useScript = (src, attributes = {}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const scriptRef = useRef(null);

  const loadScript = () => {
    // debugger;
    console.log("loadscript called");
    const script = document.createElement('script');
    script.id = "chatbot_script";
    script.src = src;
    script.defer = true;

    Object.keys(attributes).forEach(key => {
      script.setAttribute(key, attributes[key]);
    });

    script.onload = () => setLoaded(true);
    script.onerror = () => setError(true);
    
    if(document.getElementById("chatbot_script")) {
      console.log("already exists, will not append")
    }
    else {
      document.body.appendChild(script);
    }

    // document.body.appendChild(script);
    scriptRef.current = script;
  };

  if (!scriptRef.current) {
    loadScript();
  }

  return [loaded, error];
};

export default useScript;
