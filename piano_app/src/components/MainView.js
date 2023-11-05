import React from 'react';
// import ReactPlayer from 'react-player';
import GridList from './GridList';
import PianoRoll from './PianoRoll'; // Import the PianoRoll component

function MainView({ selectedGrid, gridData, handleGridClick, audioData }) {
  return (
    <div className="main-view-box">
      <div className="main-view">
         <PianoRoll selectedPianoRoll={selectedGrid} />

      </div>
      <div className="grid-list-container">
        <GridList gridData={gridData} selectedGrid={selectedGrid} onGridClick={handleGridClick} audioData={audioData} />
      </div>
    </div>
  );
}

export default MainView;
