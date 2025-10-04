import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isToggled, setIsToggled] = useState(false);

  const [timeTable, setTimeTable] = useState([]);

  useEffect(() => {
    const listener = (message) => { 
      if(message.type === "timeTableData") { 
        setTimeTable(message.payload);
      }
    }
    chrome.runtime.onMessage.addListener(listener);
    console.log("Time table: " , timeTable);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  
  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    
    console.log('Toggle state:', newState);
  };

  return (
    <div className="app">
      <h1>Toggle Button Example</h1>
      

      <button 
        onClick={handleToggle}
        className={`toggle-button ${isToggled ? 'active' : ''}`}
      >
        {isToggled ? 'ON' : 'OFF'}
      </button>

      <div className="state-display">
        <p>Current state: <strong>{isToggled ? 'ON' : 'OFF'}</strong></p>
      </div>
    </div>
  );
}

export default App;
