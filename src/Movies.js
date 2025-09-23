import React from 'react';
import { Link } from 'react-router-dom';

// Movies component
function Movies() {
  return (
    <div>
      <h1>Movies Page</h1>
      <p></p>
      
      <div className='home-button'>
        <Link to="/"><button>Home</button></Link>
      </div>
    </div>
  );
}

export default Movies;
