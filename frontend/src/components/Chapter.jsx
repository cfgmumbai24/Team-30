// src/components/Chapter.js
import React from 'react';

const Chapter = ({ content }) => {
  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.text}</p>
    </div>
  );
};

export default Chapter;
