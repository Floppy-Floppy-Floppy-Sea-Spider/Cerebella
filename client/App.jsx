// import React from "react";
// import { Route } from 'react-router-dom';
// import { useState } from "react";
// import LoginPage from "./components/LoginPage.jsx";
// import SignupPage from "./components/SignupPage.jsx";
// import FrontPage from "./components/FrontPage.jsx";
// import CreateSession from "./components/CreateSession.jsx";
// import StudySession from "./components/StudySession.jsx";
// import InputPage from "./components/InputPage.jsx";
// import SessionPage from "./components/SessionPage.jsx";
// import ReviewStudySession from "./components/ReviewStudySession.jsx";
// import CreateFlashCards from "./components/CreateFlashCards.jsx";
// import ReviewFlashCards from "./components/ReviewFlashCards.jsx";

// const App = () => {
//   return (
//     <div className="App">
//       <Route>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/mainmenu" element={<FrontPage />} />
//         <Route path="/createsession" element={<CreateSession />} />
//         <Route path="/studysession" element={<SessionPage />} />
//         <Route path="/reviewstudysession" element={<ReviewStudySession />} />
//         <Route path="/createflashcards" element={<CreateFlashCards />} />
//         <Route path="/reviewflashcards" element={<ReviewFlashCards />} />
//       </Route>
//     </div>
//   )
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import FrontPage from './components/FrontPage.jsx';
import Calendar from './components/Calendar.jsx';
import Chatroom from './components/Chatroom.jsx';
// import CreateSession from "./CreateSession.jsx";
// import StudySession from "./StudySession.jsx";
// import InputPage from "./InputPage.jsx";
// import SessionPage from "./SessionPage.jsx";
// import ReviewStudySession from "./ReviewStudySession.jsx";
// import CreateFlashCards from "./CreateFlashCards.jsx";
// import ReviewFlashCards from "./ReviewFlashCards.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} /> */}
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/chatroom" component={Chatroom} />
          {/* <Route exact path="/createsession" component={CreateSession} />
          <Route exact path="/studysession" component={SessionPage} />
          <Route exact path="/reviewstudysession" component={ReviewStudySession} />
          <Route exact path="/createflashcards" component={CreateFlashCards} /> */}
          {/* <Route exact path="/reviewflashcards" component={ReviewFlashCards} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
