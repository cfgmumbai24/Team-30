import React, { useState, useEffect } from 'react';
import "./one.css"

const TopPerformers = () => {
  const [performers, setPerformers] = useState([]);

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const response = await fetch('http://localhost:4000/leaderboard');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const sortedPerformers = result.data.sort((a, b) => b.points - a.points).slice(0, 10);
        setPerformers(sortedPerformers);
      } catch (error) {
        console.error('Failed to fetch performers:', error);
      }
    };

    fetchPerformers();
  }, []);

  return (
    <div className="top-performers-container">
      <h1>Top 10 Performers</h1>
      <div className="performers-table">
        <div className="table-header">
          <div className="table-rank">Rank</div>
          <div className="table-name">Name</div>
          <div className="table-points">Points</div>
        </div>
        {performers.map((performer, index) => (
          <div key={performer._id} className="table-row">
            <div className="table-rank">{index + 1}</div>
            <div className="table-name">{performer.name}</div>
            <div className="table-points">{performer.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;
