sessionStorage.clear();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("coqd8TXoL3rGNrfy_");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
