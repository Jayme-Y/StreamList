import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const TMDB_API_KEY = '1a9e72b514be0ae5aafef7f70edf0e22';

function Movies() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('sharedSearchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // fetch movies
  const fetchMovies = async (q) => {
    if (!q) return;
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      localStorage.setItem('movieResults', JSON.stringify(data.results || []));
    } catch (err) {
      console.error(err);
    }
  };

  // add to history
  const addToHistory = (text) => {
    const updated = [...searchHistory, { text }];
    setSearchHistory(updated);
    localStorage.setItem('sharedSearchHistory', JSON.stringify(updated));
  };

  // submit search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    fetchMovies(query);
    addToHistory(query);
    navigate(`/movies?query=${encodeURIComponent(query)}`, { replace: true });
    setQuery('');
  };

  // edit history
  const handleEdit = (i) => {
    const newText = prompt('Edit search:', searchHistory[i].text);
    if (!newText) return;

    const updated = searchHistory.map((item, index) => index === i ? { text: newText } : item);
    setSearchHistory(updated);
    localStorage.setItem('sharedSearchHistory', JSON.stringify(updated));

    fetchMovies(newText);
    navigate(`/movies?query=${encodeURIComponent(newText)}`, { replace: true });
    setQuery('');
  };

  // delete history
  const handleDelete = (i) => {
    const updated = searchHistory.filter((_, index) => index !== i);
    setSearchHistory(updated);
    localStorage.setItem('sharedSearchHistory', JSON.stringify(updated));
  };

  // fetch on URL change
  useEffect(() => {
    const param = new URLSearchParams(location.search).get('query') || '';
    if (param) fetchMovies(param);
  }, [location.search]);

  return (
    <div className="app-container">
      <div className="nav-buttons">
        <Link to="/" className="nav-link-button">Home</Link>
        <Link to="/movies" className="nav-link-button">Movies</Link>
        <Link to="/about" className="nav-link-button">About</Link>
        <Link to="/cart" className="nav-link-button">Cart</Link>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type here to search..."
        />
        <button type="submit">Search</button>
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

      <div className="search-results">
        {results.length > 0 ? results.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{movie.title}</h3>
            <p>Release: {movie.release_date}</p>
          </div>
        )) : <p>No movies found</p>}
      </div>
    </div>
  );
}

export default Movies;
