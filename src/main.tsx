import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initPWA } from './lib/pwa';
import './index.css';

// Only initialize PWA outside WebContainer environment
if (!window.location.hostname.includes('webcontainer')) {
  initPWA();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);