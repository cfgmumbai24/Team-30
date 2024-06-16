// src/components/Navigation.js
import React from 'react';
import '../styles/modules.scss';

const Navigation = ({ currentChapter, totalChapters, onNext, onPrevious }) => {
  return (
    <div className='navigation-buttons'>
      <button onClick={onPrevious} disabled={currentChapter === 0}>
        Previous
      </button>
      <button onClick={onNext} disabled={currentChapter === totalChapters}>
        Next
      </button>
    </div>
  );
};

export default Navigation;
