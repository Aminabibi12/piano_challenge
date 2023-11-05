import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import Welcome from './components/WelcomeText';
import GridContainer from './components/GridContainer';
import MainView from './components/MainView';

function App() {
  const [gridData, setGridData] = useState([]);
  const [selectedGrid, setSelectedGrid] = useState(null);
  const [audioData, setAudioData] = useState({
    start: null,
    end: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pianoroll.ai/random_notes');
        if (response.ok) {
          const result = await response.json();
          setGridData(result.slice(0, 21));
        } else {
          console.error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleGridClick = (grid) => {
    setSelectedGrid(grid);
    const newAudioData = {
      start: grid.start,
      end: grid.end,
    };
    setAudioData(newAudioData);
  };

  return (
    <div className="main-container">
      <NavBar />
      <Welcome />
      <div className="content-container">
        <div className="main-content">
          {selectedGrid ? (
            <MainView
              selectedGrid={selectedGrid}
              gridData={gridData}
              handleGridClick={handleGridClick}
              audioData={audioData}
            />
          ) : (
            <GridContainer
              selectedGrid={selectedGrid}
              onGridClick={handleGridClick}
              gridData={gridData}
              audioData={audioData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
