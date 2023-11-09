import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";
import "../public/frontpage.css"

const FrontPage = ({ username }) => {
  return (
    <div className="mainMenu">
      <HeaderMenu username={username} />
      <section className="selectionMenu">
        <h1>What would you like to learn today?</h1>
        <div className="selectionButtons">
          <Link to="/createsession" className="gridItem">
            <button>CREATE STUDY SESSION</button>
          </Link>
          <Link to="/reviewstudysession" className="gridItem">
            <button>REVIEW STUDY SESSIONS</button>
          </Link>
          <Link to="/chatroom" className="gridItem">
            <button>STUDENT CHATROOM</button>
          </Link>
          <Link to="/calendar" className="gridItem">
            <button>STUDY CALENDAR</button>
          </Link>
          <Link to="/chatroom" className="gridItem">
            <button>CHAT ROOM</button>
          </Link>
        </div>
      </section>
      <FooterMenu />
    </div>
  );
};

export default FrontPage;
