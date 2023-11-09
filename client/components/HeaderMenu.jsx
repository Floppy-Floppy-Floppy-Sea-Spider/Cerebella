import React from "react";
import { Link } from 'react-router-dom';

function HeaderMenu({username}) {
  return (
    <nav className="headerMenu">
      <h1 className="cerebella">Cerebella</h1>
      <ul>
        <li className="username">WELCOME{username}</li>
        <li><Link to="/">LOGOUT</Link></li>
      </ul>
    </nav>
  )
}

export default HeaderMenu;