import React, { Component } from 'react';

import NavigationBar from '../components/NavigationBar';
import FlashMessagesList from '../components/FlashMessagesList';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
