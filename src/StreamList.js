import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const moviePosters = [
  'https://www.originalfilmart.com/cdn/shop/files/harry_potter_and_the_sorcerers_stone_2001_original_film_art_5000x.webp?v=168487281',
  'https://insessionfilm.com/wp-content/uploads/2022/09/Screen-Shot-2022-09-26-at-7.13.09-AM.png',
  'https://creativereview.imgix.net/uploads/2024/12/AlienRomulus-scaled.jpg?auto=compress,format&crop=faces,entropy,edges&fit=crop&q=60&w=1728&h=2560',
  'https://i.etsystatic.com/37166133/r/il/60f034/4087791906/il_570xN.4087791906_jcbj.jpg',
  'https://www.indiewire.com/wp-content/uploads/2019/12/us-1.jpg?w=758',
  'https://www.movieposters.com/cdn/shop/files/tenet_topbsizl_600x.jpg?v=1698433999',
];

// Main StreamList component
function StreamList() {
  // State for search input and movie reel index
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // Auto-scroll movie reel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 1) % moviePosters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handlers for search input
  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setItems(prev => [...prev, { text: input }]);
    console.log(input);
    setInput('');
  };

  const handleDelete = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleComplete = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newValue) => {
    setItems(prev => prev.map((item, i) => (i === index ? { text: newValue } : item)));
  };

  // How many posters to show in the reel
  const visiblePosters = [];
  for (let i = 0; i < 4; i++) {
    visiblePosters.push(moviePosters[(startIndex + i) % moviePosters.length]);
  }

  // Search form, navigation buttons, and movie reel
  return (
    <div className="app-container">
      <div className="nav-buttons">
        <Link to="/movies" className="nav-link-button">
          <span className="material-icons-outlined">movie</span>
          Movies
        </Link>

        <Link to="/about" className="nav-link-button">
          <span className="material-icons-outlined">info</span>
          About
        </Link>

        <Link to="/cart" className="nav-link-button">
          <span className="material-icons">shopping_cart</span>
          Cart
        </Link>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type here to search..."
        />
        <button type="submit">
          <span className="material-icons">search</span> Submit
        </button>
      </form>

      <div className="results">
        <ul className="item-list">
          {items.map((item, index) => (
            <li key={index} className="item">
              <span className="item-text">{item.text}</span>
              <button onClick={() => handleComplete(index)}>Complete</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button
                onClick={() =>
                  handleEdit(index, prompt('Edit item:', item.text))
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="app-trending">Trending Today</p>

      <div className="movie-reel">
        {visiblePosters.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Movie ${idx + 1}`}
            className="movie-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default StreamList;