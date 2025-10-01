import React from 'react';
import { Link } from 'react-router-dom';

// Movies component
function Movies() {
  return (
    <div>
      <h1>Movies Page</h1>
      <p></p>

      <div className="home-button">
        <Link to="/" className="home-link-button">
          <span className="material-icons">home</span>
          Home
        </Link>
      </div>
    </div> 
  );
}

export default Movies;
