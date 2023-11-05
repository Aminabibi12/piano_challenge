import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function GridContainer({ selectedGrid, onGridClick, audioData }) {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pianoroll.ai/random_notes');
        if (response.ok) {
          const result = await response.json();
          setGridData(result.slice(0, 21));
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []);

  console.log('Grid Data:', gridData); // Debugging

  return (
    <div className="grid-container">
      <div className="grid-row">
        {gridData.map((item, index) => (
          <div
            key={index}
            className={`grid-item ${selectedGrid === item ? 'selected' : ''}`}
            onClick={() => onGridClick(item, index)}
          >
            <h3>{`Piano Roll ${index + 1}`}</h3>
            <ReactPlayer
              url={`https://pianoroll.ai/random_notes/${item.pitch}.mp3`}
              controls
              playing={false}
              width="100%"
              height="50px"
              config={
                selectedGrid
                  ? {
                      file: {
                        attributes: {
                          start: audioData.start,
                          end: audioData.end,
                        },
                      },
                    }
                  : {}
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridContainer;
