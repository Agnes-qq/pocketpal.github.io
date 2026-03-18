import React from 'react';
import { createRoot } from 'react-dom/client';
import { legalPages } from './legalPages';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import './styles/app.css';

function App() {
  const page = document.getElementById('root')?.dataset.page || 'home';

  if (page === 'home') {
    return <HomePage />;
  }

  const legalPage = legalPages[page];

  if (legalPage) {
    return <LegalPage {...legalPage} />;
  }

  return <HomePage />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
