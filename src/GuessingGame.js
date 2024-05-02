import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GuessingGame({ gameSettings, updateStats }) {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * (gameSettings.maxNumber - gameSettings.minNumber + 1)) + gameSettings.minNumber);
  const [guessesLeft, setGuessesLeft] = useState(gameSettings.guessesAllowed);
  const [gameOver, setGameOver] = useState(false);

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const guessedNumber = parseInt(guess);

    if (guessedNumber === targetNumber) {
      setMessage('Congratulations! You guessed correctly!');
      setGameOver(true);
      updateStats(true, gameSettings.guessesAllowed - guessesLeft + 1);
    } else if (guessesLeft === 1) {
      setMessage(`Sorry, you're out of guesses. The correct number was ${targetNumber}.`);
      setGameOver(true);
    } else if (guessedNumber < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }

    setGuessesLeft(guessesLeft - 1);
    setGuess('');
  };

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * (gameSettings.maxNumber - gameSettings.minNumber + 1)) + gameSettings.minNumber);
    setGuessesLeft(gameSettings.guessesAllowed);
    setGameOver(false);
    setMessage('');
    setGuess('');
  };

  return (
    <div>
      <h1>Guessing Game</h1>
      {gameOver ? (
        <div>
          <p>{message}</p>
          <button onClick={startNewGame}>Start New Game</button>
          <Link to="/stats">View Stats</Link>
        </div>
      ) : (
        <div>
          <p>{message}</p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="number"
              value={guess}
              onChange={handleInputChange}
              placeholder="Enter your guess..."
              min={gameSettings.minNumber}
              max={gameSettings.maxNumber}
              required
            />
            <button type="submit">Guess</button>
          </form>
          <p>Guesses left: {guessesLeft}</p>
        </div>
      )}
    </div>
  );
}

export default GuessingGame;