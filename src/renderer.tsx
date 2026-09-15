import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ControllerApp from './components/ControllerApp';
import './index.css'

const container = document.getElementById('root');

// useEffect(() => {
//     const testApi = async () => {
//         try {
//             console.log("Testing API...");

//             const response = await fetch(
//                 "http://localhost:3000/api/device-logs"
//             );

//             console.log("API response:", response.status);

//             const data = await response.json();

//             console.log("API data:", data);
//         } catch (error) {
//             console.error("API TEST FAILED:", error);
//         }
//     };

//     testApi();
// }, []);

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
      window.location.hash === '#controller' ? <ControllerApp /> : <App />
  );
}