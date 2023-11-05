import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function PianoRoll({ selectedPianoRoll }) {
  const [audioUrl, setAudioUrl] = useState('');
  const [displayValue, setDisplayValue] = useState(null);

  useEffect(() => {
    // Generate the URL for the audio source when selectedPianoRoll changes
    if (selectedPianoRoll) {
      const audioSource = `https://pianoroll.ai/random_notes/${selectedPianoRoll.pitch}.mp3`;
      setAudioUrl(audioSource);
    }
  }, [selectedPianoRoll]);

  const showValue = (type, value) => {
    setDisplayValue(`${type}: ${value}`);
  };

  return (
    <div className="piano-roll-container">
      <div className="piano-roll-details">
        <h2>Piano Roll Details</h2>
        {selectedPianoRoll ? (
          <>
            <button className='button1' onClick={() => showValue('Note', selectedPianoRoll.pitch)}>Note</button>
            <button className='button2' onClick={() => showValue('Start', selectedPianoRoll.start)}>Start</button>
            <button className='button3' onClick={() => showValue('End', selectedPianoRoll.end)}>End</button>
          </>
        ) : (
          <p>Please select a piano roll.</p>
        )}
        <ReactPlayer url={audioUrl} controls playing width="100%" height="50px" />
        {displayValue && (
          <div className="text-overlay">
            {displayValue}
          </div>
        )}
      </div>
    </div>
  );
}

export default PianoRoll;
