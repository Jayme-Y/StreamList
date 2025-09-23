import React from 'react';
import { Link } from 'react-router-dom';

// About component
function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p></p>

      <div className='home-button'>
        <Link to="/"><button>Home</button></Link>
      </div>
    </div>
  );
}

export default About;
