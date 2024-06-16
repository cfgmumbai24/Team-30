// src/components/Chapter.js
import React from 'react';
import '../styles/modules.scss';

const Chapter = ({ content }) => {
  return (
    <div className='chapter-content'>
      <h2>{content.title}</h2>
      <p>{content.text}</p>
    </div>
  );
};

export default Chapter;
