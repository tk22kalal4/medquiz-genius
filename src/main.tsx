
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add AdSense script to the document head
const addAdSenseScript = () => {
  const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
  
  if (!existingScript) {
    const adScript = document.createElement('script');
    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5920367457745298`;
    adScript.async = true;
    adScript.crossOrigin = 'anonymous';
    document.head.appendChild(adScript);
    console.log('AdSense script added to head');
  }
};

// Add GPT Engineer script check
const checkGptEngineerScript = () => {
  const existingScript = document.querySelector('script[src*="cdn.gpteng.co/gptengineer.js"]');
  
  if (!existingScript) {
    try {
      const script = document.createElement('script');
      script.src = "https://cdn.gpteng.co/gptengineer.js";
      script.type = "module";
      document.head.appendChild(script);
      console.log('GPT Engineer script added to head');
    } catch (err) {
      console.error('Error adding GPT Engineer script:', err);
    }
  }
};

// Initialize scripts
const initializeScripts = () => {
  // Check if running in browser environment
  if (typeof window !== 'undefined') {
    addAdSenseScript();
    checkGptEngineerScript();
  }
};

// Initialize immediately for browser environment
initializeScripts();

// Also listen for deviceready event for Capacitor/Cordova
document.addEventListener('deviceready', initializeScripts, false);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(<App />);
