import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SettingsPage({ setGameSettings }) {
  const [guessesAllowed, setGuessesAllowed] = useState(5);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(100);

  const handleSubmit = (event) => {
    event.preventDefault();
    setGameSettings({ guessesAllowed, minNumber, maxNumber });
  };

  return (
    <div>
      <h1>Game Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="guessesAllowed">Number of Guesses Allowed:</label>
          <input
            type="number"
            id="guessesAllowed"
            value={guessesAllowed}
            onChange={(e) => setGuessesAllowed(parseInt(e.target.value))}
            min="1"
          />
        </div>
        <div>
          <label htmlFor="minNumber">Minimum Number:</label>
          <input
            type="number"
            id="minNumber"
            value={minNumber}
            onChange={(e) => setMinNumber(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="maxNumber">Maximum Number:</label>
          <input
            type="number"
            id="maxNumber"
            value={maxNumber}
            onChange={(e) => setMaxNumber(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
      <Link to="/">Back to Game</Link>
    </div>
  );
}

export default SettingsPage;