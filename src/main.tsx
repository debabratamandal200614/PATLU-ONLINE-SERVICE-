import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Guard against cross-origin iframe restrictions and React 19 re-entrancy warnings
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (
      msg.includes('Blocked a frame with origin') ||
      msg.includes('cross-origin') ||
      msg.includes('Should not already be working') ||
      event.error?.name === 'SecurityError'
    ) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      return true;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reasonMsg = event.reason?.message || String(event.reason || '');
    if (
      reasonMsg.includes('Blocked a frame with origin') ||
      reasonMsg.includes('cross-origin') ||
      reasonMsg.includes('Should not already be working') ||
      event.reason?.name === 'SecurityError'
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
