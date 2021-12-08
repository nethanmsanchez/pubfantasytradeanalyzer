// index.js
// FantasyTradeAnalyzer
// Nethan S
// This file is the landing point for the React code/UI. Just contains the results from App.js.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// This makes it only reload/refresh the component that needs to be changed instead of the whole page.
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

