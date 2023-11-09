// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import HeaderMenu from "./HeaderMenu.jsx";
// import FooterMenu from "./FooterMenu.jsx";

// const FrontPage = ({username}) => {
//   // const navigate = useNavigate();

//   return (
//     <div className="mainMenu">
//       <HeaderMenu username={username}/>
//       <section className="selectionMenu">
//         <h1>What would you like to learn today?</h1>
//         <div className="selectionButtons">
//           <button 
//             className="gridItem"
//             onClick={() => navigate('/createsession')}
//             username={username}>CREATE STUDY SESSION</button>
//           <button
//             className="gridItem"
//             onClick={() => navigate('/reviewstudysession')}
//             username={username}>REVIEW STUDY SESSIONS</button>
//           <button
//             className="gridItem"
//             onClick={() => navigate('/createflashcards')}
//             username={username}>CREATE FLASH CARDS</button>
//           <button
//             className="gridItem"
//             onClick={() => navigate('/calendar')}
//             username={username}>CALENDAR</button>
//         </div>
//       </section>
//       <FooterMenu />
//     </div>
//   );
// };
// export default FrontPage;

import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";

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
          <Link to="/createflashcards" className="gridItem">
            <button>CREATE FLASH CARDS</button>
          </Link>
          <Link to="/calendar" className="gridItem">
            <button>CALENDAR</button>
          </Link>
          <Link to="/chatroom" className="gridItem">
            <button>CHAT ROOM</button>
          </Link>
          <Link to="/studytracker" className="gridItem">
            <button>STUDY TRACKER</button>
          </Link>
        </div>
      </section>
      <FooterMenu />
    </div>
  );
};

export default FrontPage;
