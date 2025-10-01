import React from 'react';
import { Link } from 'react-router-dom';

// Cart component
function Cart() {
  return (
    <div>
      <h1>Cart</h1>
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

export default Cart;
