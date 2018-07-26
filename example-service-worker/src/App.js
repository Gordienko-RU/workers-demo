import React, { Component } from 'react';
import './App.css';

class App extends Component {

  async componentDidMount() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('successfull');
      } catch (err) {
        console.log('failure');
      }
    }
  }

  render() {
    return (
      <div className="App">
        <img alt='some cat' src='images/cat.jpg'></img>
        <img alt='some ducks' src='images/ducks.jpg'></img>
        <img alt='some turtle' src='images/turtle.png'></img>
        <img alt='some snake' src='images/snake.png'></img>
      </div>
    );
  }
}

export default App;
