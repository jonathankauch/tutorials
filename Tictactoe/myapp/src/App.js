import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './components/Game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tictactoe ReactJS</h2>
        </div>
        <div className="container">
          <p>
            Tictactoe game from the ReactJS tutorial
          </p>
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
