import React, { useState, useEffect } from 'react';
import "../public/calendar.css"
import bloop from "../public/soundfx/bloop.mp3"

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayContent, setDayContent] = useState(null);

  function chooseDaySound(){
    new Audio(bloop).play();
  }

  useEffect(() => {
    const fetchDayContent = async () => {
      if (selectedDay) {
        try {
          const response = await fetch(
            `http://localhost:3000/calendar/${selectedDay}`
          );
          if (response.ok) {
            const dayData = await response.json();
            setDayContent(dayData.content);
          } else {
            setDayContent(null);
          }
        } catch (error) {
          console.error('Error fetching day content:', error);
          setDayContent(null);
        }
      }
    };

    fetchDayContent();
  }, [selectedDay]);

  const handleSquareClick = async (day) => {
    chooseDaySound();
    setSelectedDay(day);
  };

  const closeCard = () => {
    setSelectedDay(null);
  };

  const renderCard = () => {
    if (selectedDay !== null) {
      return (
        <div className="card">
          <span onClick={closeCard} className="close-button">
            X
          </span>
          <h3>Day {selectedDay}</h3>
          <p>
            Content for Day {selectedDay}: {dayContent}
          </p>
        </div>
      );
    }
  };

  return (
    <div className='calendar'>
      <h1 className='calTitle'>Study Calendar</h1>
      {renderCard()}
      <div className="days">
        {[...Array(30).keys()].map((day) => (
          <div
            key={day + 1}
            className="day-square"
            onClick={() => handleSquareClick(day + 1)}
          >
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
