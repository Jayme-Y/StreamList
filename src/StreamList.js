import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const moviePosters = [
  'https://www.originalfilmart.com/cdn/shop/files/harry_potter_and_the_sorcerers_stone_2001_original_film_art_5000x.webp?v=168487281',
  'https://insessionfilm.com/wp-content/uploads/2022/09/Screen-Shot-2022-09-26-at-7.13.09-AM.png',
  'https://creativereview.imgix.net/uploads/2024/12/AlienRomulus-scaled.jpg?auto=compress,format&crop=faces,entropy,edges&fit=crop&q=60&w=1728&h=2560',
  'https://i.etsystatic.com/37166133/r/il/60f034/4087791906/il_570xN.4087791906_jcbj.jpg',
  'https://www.indiewire.com/wp-content/uploads/2019/12/us-1.jpg?w=758',
  'https://www.movieposters.com/cdn/shop/files/tenet_topbsizl_600x.jpg?v=1698433999',
];

function StreamList() {
  const [input, setInput] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('sharedSearchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  // movie reel auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % moviePosters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // save search history
  useEffect(() => {
    localStorage.setItem('sharedSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // submit search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...searchHistory, { text: input }];
    setSearchHistory(newHistory);

    navigate(`/movies?query=${encodeURIComponent(input)}`);
    setInput('');
  };

  // edit search history
  const handleEdit = (index) => {
    const newText = prompt('Edit search:', searchHistory[index].text);
    if (!newText) return;

    const updated = searchHistory.map((item, i) => (i === index ? { text: newText } : item));
    setSearchHistory(updated);
    navigate(`/movies?query=${encodeURIComponent(newText)}`);
    setInput(newText);
  };

  // delete search history
  const handleDelete = (index) => {
    const updated = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updated);
  };

  // get visible posters
  const visiblePosters = [];
  for (let i = 0; i < 4; i++) {
    visiblePosters.push(moviePosters[(startIndex + i) % moviePosters.length]);
  }

  return (
    <div className="app-container">
      <div className="nav-buttons">
        <Link to="/movies" className="nav-link-button">
          <span className="material-icons-outlined">movie</span> Movies
        </Link>
        <Link to="/about" className="nav-link-button">
          <span className="material-icons-outlined">info</span> About
        </Link>
        <Link to="/cart" className="nav-link-button">
          <span className="material-icons">shopping_cart</span> Cart
        </Link>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here to search..."
        />
        <button type="submit">
          <span className="material-icons">search</span> Submit
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div className="search-history">
          <h3>Previous Searches</h3>
          <ul className="item-list">
            {searchHistory.map((item, index) => (
              <li key={index} className="item">
                <span className="item-text">{item.text}</span>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="app-trending">Trending Today</p>
      <div className="movie-reel">
        {visiblePosters.map((src, idx) => (
          <img key={idx} src={src} alt={`Movie ${idx + 1}`} className="movie-cover" />
        ))}
      </div>
    </div>
  );
}

export default StreamList;
