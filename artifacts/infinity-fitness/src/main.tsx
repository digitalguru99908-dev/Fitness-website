import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

// Kisi bhi page (route) par browser refresh/reload karne se direct Home par le jaao.
// Owner admin panel (/owner) sirf reset/repaired hone par home se bacha rahega.
if (
  window.location.pathname !== '/' &&
  !window.location.pathname.startsWith('/owner')
) {
  window.location.replace('/');
} else {
  createRoot(document.getElementById('root')!).render(<App />);
}
