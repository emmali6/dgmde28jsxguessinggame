import React, { useState } from 'react';
import './App.css';

const GuessApp = () => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState('');
  const [remainingGuesses, setRemainingGuesses] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [settingsPage, setSettingsPage] = useState(false);
  const [statsPage, setStatsPage] = useState(false);
  const [gamesWon, setGamesWon] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [guessesAllowed, setGuessesAllowed] = useState(5);
  const [numberRangeMin, setNumberRangeMin] = useState(1);
  const [numberRangeMax, setNumberRangeMax] = useState(100);

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuess = () => {
    if (gameOver) return;

    const guessedNumber = parseInt(guess);
    if (guessedNumber === number) {
      setStatus('Guessed correctly!');
      setGamesWon(gamesWon + 1);
      setTotalGuesses(totalGuesses + (5 - remainingGuesses) + 1);
      setTotalGames(totalGames + 1);
      setGameOver(true);
    } else if (remainingGuesses === 1) {
      setStatus(`Out of guesses! The correct number was ${number}.`);
      setTotalGames(totalGames + 1);
      setGameOver(true);
    } else if (guessedNumber < number) {
      setStatus('Too low!');
      setRemainingGuesses(remainingGuesses - 1);
    } else if (guessedNumber > number) {
      setStatus('Too high!');
      setRemainingGuesses(remainingGuesses - 1);
    }
    setGuess('');
  };

  const handleNewGame = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setStatus('');
    setRemainingGuesses(5);
    setGameOver(false);
  };

  const handleSettings = () => {
    setSettingsPage(true);
    setStatsPage(false);
  };

  const handleStats = () => {
    setStatsPage(true);
    setSettingsPage(false);
  };

  const handleGuessesAllowedChange = (event) => {
    setGuessesAllowed(parseInt(event.target.value));
  };

  const handleNumberRangeMinChange = (event) => {
    setNumberRangeMin(parseInt(event.target.value));
  };

  const handleNumberRangeMaxChange = (event) => {
    setNumberRangeMax(parseInt(event.target.value));
  };

  const handleSaveSettings = () => {
    // Save settings logic
    setSettingsPage(false); // Close settings page after saving
    setNumberRange(numberRangeMin, numberRangeMax); // Update number range
    setRemainingGuesses(guessesAllowed); // Update remaining guesses
  };

  const setNumberRange = (min, max) => {
    if (min >= max) {
      // Ensure minimum is less than maximum
      alert("Minimum must be less than maximum");
      return;
    }
    setNumberRangeMin(min);
    setNumberRangeMax(max);
    // Generate new random number within the new range
    setNumber(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const SettingsPage = () => {
    return (
      <div className="container">
        <h1>Settings</h1>
        <label htmlFor="guessesAllowed">Number of Guesses Allowed:</label>
        <input
          type="number"
          id="guessesAllowed"
          value={guessesAllowed}
          onChange={handleGuessesAllowedChange}
        />
        <br />
        <label htmlFor="numberRangeMin">Number Range (Min):</label>
        <input
          type="number"
          id="numberRangeMin"
          value={numberRangeMin}
          onChange={handleNumberRangeMinChange}
        />
        <br />
        <label htmlFor="numberRangeMax">Number Range (Max):</label>
        <input
          type="number"
          id="numberRangeMax"
          value={numberRangeMax}
          onChange={handleNumberRangeMaxChange}
        />
        <br />
        <button className="save-settings-button" onClick={handleSaveSettings}>Save Settings</button>
        <button className="back-button" onClick={() => setSettingsPage(false)}>Back</button>
      </div>
    );
  };

  const StatsPage = () => {
    const averageGuesses = totalGames > 0 ? (totalGuesses / totalGames).toFixed(2) : 0;
    return (
      <div className="container">
        <h1>Player Stats</h1>
        <p>Games Won: {gamesWon}</p>
        <p>Average Guesses Needed: {averageGuesses}</p>
        <button className="back-button" onClick={() => setStatsPage(false)}>Back</button>
      </div>
    );
  };

  const renderGamePage = () => {
    return (
      <div className="container">
        <h1>Guessing Game</h1>
        {!gameOver && (
          <>
            <input
              type="number"
              value={guess}
              onChange={handleInputChange}
              disabled={gameOver}
            />
            <button className="guess-button" onClick={handleGuess} disabled={gameOver}>Guess</button>
            <p>Remaining guesses: {remainingGuesses}</p>
            <p>{status}</p>
            <button className="settings-button" onClick={handleSettings}>Settings</button>
            <button className="stats-button" onClick={handleStats}>Stats</button>
          </>
        )}
        {gameOver && (
          <>
            <p>{status}</p>
            <button className="new-game-button" onClick={handleNewGame}>New Game</button>
          </>
        )}
      </div>
    );
  };

  const renderSettingsPage = () => {
    return settingsPage && <SettingsPage />;
  };

  const renderStatsPage = () => {
    return statsPage && <StatsPage />;
  };

  return (
    <div>
      {renderGamePage()}
      {renderSettingsPage()}
      {renderStatsPage()}
    </div>
  );
};

export default GuessApp;