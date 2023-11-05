import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function GridList({ selectedGrid, onGridClick, gridData, audioData }) {
  const [gridItems, setGridItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pianoroll.ai/random_notes');
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.slice(0, 21).map((item, index) => ({
            pitch: item.pitch,
            duration: item.duration, // Include duration from your data
            velocity: item.velocity,
            start: item.start,
            end: item.end, // Include velocity from your data
          }));
          setGridItems(filteredData);
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    }

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <ul className="grid-list">
      {gridItems.map((item, index) => (
        <li
          key={index}
          className={`grid-item ${selectedGrid === item ? 'selected' : ''}`}
          onClick={() => onGridClick(item)}
        >
          <p>{`Piano Roll ${index + 1}`}</p>
          
          <ReactPlayer
            url={`https://pianoroll.ai/random_notes/${item.pitch}.mp3`}
            controls
            playing={false}
            width="100%"
            height="50px"
            config={{
              file: {
                attributes: {
                  start: audioData.start,
                  end: audioData.end,
                },
              },
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default GridList;
