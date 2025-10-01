import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components and assets
import StreamList from './StreamList';
import Movies from './Movies';
import About from './About';
import Cart from './Cart';
import logo from './eztech.png';
import './index.css';

// Main application render, app background and container, and render routes
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="app-background">
        <div className="app-container">
          <div className="app-header">
            <img src={logo} alt="Logo" className="app-logo" />
            <span className="app-title">StreamList</span>
          </div>
          <p className="app-subtitle">
            EzTechMovie brings you the highest quality movie streaming entity nationally
          </p>

          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);
