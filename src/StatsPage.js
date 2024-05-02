import React from 'react';
import { Link } from 'react-router-dom';

function StatsPage({ gameStats }) {
  return (
    <div>
      <h1>Game Statistics</h1>
      <p>Total Games: {gameStats.totalGames}</p>
      <p>Total Wins: {gameStats.totalWins}</p>
      <p>Total Guesses: {gameStats.totalGuesses}</p>
      <p>Average Guesses: {gameStats.averageGuesses.toFixed(2)}</p>
      <Link to="/">Back to Game</Link>
    </div>
  );
}

export default StatsPage;