import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './globals.css';
import '@fontsource-variable/inter';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('#root element missing from index.html');
createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
