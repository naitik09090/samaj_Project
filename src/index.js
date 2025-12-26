// import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap-minimal.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Bootstrap is loaded via CDN/preload in public/index.html to avoid
// duplicating the CSS/JS in the webpack bundle and reduce unused bytes.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
