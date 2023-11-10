//studytracker.jsx
import React, { useState } from "react";
import "../public/studytracker.css";

const ColumnChart = ({ data }) => {
  const subjects = ["Math", "Science", "Music", "History", "Biology"];
  const colorClasses = [
    "first-color",
    "second-color",
    "third-color",
    "fourth-color",
    "fifth-color"
  ];

  return (
    <div className="column-chart">
      <div className="chart-container">
        {subjects.map((subject, index) => (
          <div key={index} className="column">
            <span className="subject-label">{subject}</span>
            <div className={`bar ${colorClasses[index]}`} style={{ width: `${data[index] * 10}px` }}>
              {data[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudyTracker = () => {
  const [hours, setHours] = useState({
    Math: 0,
    Science: 0,
    Music: 0,
    History: 0,
    Biology: 0
  });

  const [chartData, setChartData] = useState([0, 0, 0, 0, 0]);

  const handleChange = (subject, value) => {
    setHours({ ...hours, [subject]: value });
  };

  const handleSubmit = () => {
    const { Math, Science, Music, History, Biology } = hours;
    setChartData([Math, Science, Music, History, Biology]);
  };

  return (
    <div className="app">
      <h1 className="appTitle">Brainy Bars</h1>
      <div className="form">
        {Object.entries(hours).map(([subject, value], index) => (
          <label key={index}>
            {subject}:
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(subject, e.target.value)}
            />
          </label>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ColumnChart data={chartData} />
    </div>
  );
};

export default StudyTracker;
