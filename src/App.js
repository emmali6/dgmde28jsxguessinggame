import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const GuessApp = () => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState('');
  const [remainingGuesses, setRemainingGuesses] = useState(5);
  const [gameOver, setGameOver] = useState(false);
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
    setNumberRange(numberRangeMin, numberRangeMax);
    setRemainingGuesses(guessesAllowed);
  };

  const setNumberRange = (min, max) => {
    if (min >= max) {
      alert("Minimum must be less than maximum");
      return;
    }
    setNumberRangeMin(min);
    setNumberRangeMax(max);
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
      </div>
    );
  };

  const Homepage = () => {
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
            <button onClick={handleGuess} disabled={gameOver}>Guess</button>
            <p>Remaining guesses: {remainingGuesses}</p>
            <p>{status}</p>
          </>
        )}
        {gameOver && (
          <>
            <p>{status}</p>
            <button onClick={handleNewGame}>New Game</button>
          </>
        )}
      </div>
    );
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Game</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default GuessApp;