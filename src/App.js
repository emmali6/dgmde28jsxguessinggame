import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GuessingGame from './GuessingGame';
import SettingsPage from './SettingsPage';
import StatsPage from './StatsPage';
import './App.css';

function App() {
  const [gameSettings, setGameSettings] = useState({
    guessesAllowed: 5,
    minNumber: 1,
    maxNumber: 100
  });
  const [gameStats, setGameStats] = useState({
    totalGames: 0,
    totalWins: 0,
    totalGuesses: 0,
    averageGuesses: 0
  });

  const updateStats = (win, guessesUsed) => {
    const totalGames = gameStats.totalGames + 1;
    const totalWins = win ? gameStats.totalWins + 1 : gameStats.totalWins;
    const totalGuesses = gameStats.totalGuesses + guessesUsed;
    const averageGuesses = totalGuesses / totalGames;
    setGameStats({
      totalGames,
      totalWins,
      totalGuesses,
      averageGuesses
    });
  };

  return (
    <Router>
      <Route exact path="/" render={() => <GuessingGame gameSettings={gameSettings} updateStats={updateStats} />} />
      <Route path="/settings" render={() => <SettingsPage setGameSettings={setGameSettings} />} />
      <Route path="/stats" render={() => <StatsPage gameStats={gameStats} />} />
    </Router>
  );
}

export default App;