import React from "react";
import { Link } from 'react-router-dom';

function HeaderMenu({username}) {
  return (
    <nav className="headerMenu">
      <img src="./logo_small.png"/>
      <ul>
        <li className="username">WELCOME{username}</li>
        <li><Link to="/">LOGOUT</Link></li>
      </ul>
    </nav>
  )
}

export default HeaderMenu;