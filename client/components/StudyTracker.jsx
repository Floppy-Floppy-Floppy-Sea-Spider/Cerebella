import React, { useState } from "react";
import "/Users/Mai/Desktop/React copy/Cerebella/client/public/studyTracker.css";

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
      {data.map((hours, index) => (
        <div key={index} className="column">
          <div className={`bar ${colorClasses[index]}`} style={{ height: `${hours * 10}px` }}>
            {hours}
          </div>
          <span className="subject-label">{subjects[index]}</span>
        </div>
      ))}
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
    <div className="App">
      <h1>Brainy Bars</h1>
      <div className="form">
        <label>
          Math:
          <input
            type="number"
            value={hours.Math}
            onChange={(e) => handleChange("Math", e.target.value)}
          />
        </label>
        <label>
          Science:
          <input
            type="number"
            value={hours.Science}
            onChange={(e) => handleChange("Science", e.target.value)}
          />
        </label>
        <label>
          Music:
          <input
            type="number"
            value={hours.Music}
            onChange={(e) => handleChange("Music", e.target.value)}
          />
        </label>
        <label>
          History:
          <input
            type="number"
            value={hours.History}
            onChange={(e) => handleChange("History", e.target.value)}
          />
        </label>
        <label>
          Biology:
          <input
            type="number"
            value={hours.Biology}
            onChange={(e) => handleChange("Biology", e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ColumnChart data={chartData} />
    </div>
  );
}

export default StudyTracker;