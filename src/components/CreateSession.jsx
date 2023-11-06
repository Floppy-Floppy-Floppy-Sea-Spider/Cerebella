import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";

function CreateSession({username}) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [mainPoints, setMainPoints] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  function submitSession(e) {
    e.preventDecault();
    // update to send to database
    fetch('/api/create-study-session'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        title: title,
        topic: topic,
        mainPoints: mainPoints,
        painPoints: painPoints,
        notes: notes
      }).then(res => {
        navigate('/sessionpage')
      }).catch(err => {
        console.log.error('Error creating session');
        throw new Error(`HTTP error! status: ${response.status}`);
      })
    }
  }

  return (
    <div className="createSession">
      <HeaderMenu username = {username} />
      <section className = "createSessionMain">
        <form onSubmit={submitSession}>
          <div className="createSessionForm">
            <div className="formLeftSide">
              <h1>CREATE NEW STUDY SESSION</h1>
              <div className="formItem">
                <label>TITLE</label>
                <input 
                  className="formInput" 
                  name="title"
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                  placeholder="What would you like to name this session?">
                </input>
              </div>
              <div className="formItem">
                <label>TOPIC</label>
                <input 
                  className="formInput" 
                  name="topic"
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required 
                  placeholder="What topic would you like to study?">
                </input>
              </div>
              <div className="formItem">
                <label>MAIN POINTS</label>
                <input 
                  id="mainPoints"
                  className="formInput" 
                  name="topic"
                  type="text" 
                  value={mainPoints}
                  onChange={(e) => setMainPoints(e.target.value)}
                  required 
                  placeholder="What are the main areas you want to cover?">
                </input>
              </div>
              <div className="formItem">
              <label>PAIN POINTS</label>
                <input 
                  id="painPoints"
                  className="formInput" 
                  name="topic"
                  type="text" 
                  value={painPoints}
                  onChange={(e) => setPainPoints(e.target.value)}
                  required 
                  placeholder="What areas do you need help with?">
                </input>
              </div>
            </div>
            <div className="formRightSide">
              <label>Notes</label>
              <input 
                className="formInput" 
                name="topic"
                type="textarea" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required 
                placeholder="Copy and Paste Your Notes Here">
              </input>
              <button className="orangeBtn" type='submit'>Create Session</button>
            </div>
            
          </div>
        </form>
      </section>
      <FooterMenu />
    </div>
  )
}

export default CreateSession;