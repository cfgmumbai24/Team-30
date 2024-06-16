// src/components/Progress.js
import React from 'react';
import '../styles/modules.scss';

const Progress = ({ currentChapter, totalChapters }) => {
  console.log('Progress - Current Chapter:', currentChapter);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {Array.from({ length: totalChapters }).map((_, index) => (
        <div
          key={index}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: index < currentChapter ? 'green' : 'gray',
            margin: '0 5px',
          }}
        ></div>
      ))}
    </div>
  );
};

export default Progress;
