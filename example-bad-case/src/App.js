import React, { Component } from 'react';
import { 
  Button,
  ButtonToolbar    
} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longLoop: {
        result: null,
      },
      increment: {
        result: null,
      },
      inputValue: 9000000
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleLongLoop = this.handleLongLoop.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleIncrement() {
    this.setState({ increment: { result: this.state.increment.result + 1 }});
  }

  handleLongLoop() {
    const arr = [];

    for(let i = 0; i < this.state.inputValue; i++) {
      arr.push(new Date());
    }
    this.setState({ longLoop: { result: 'DONE' }})
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ inputValue: +e.target.value });
  }

  render() {
    return (
      <div className="grid-container">
      <input placeholder="length" value={this.state.inputValue} onChange={this.handleInput} />
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.handleLongLoop}>long loop</Button>
          <Button bsStyle="primary" onClick={this.handleIncrement}>increment</Button>
        </ButtonToolbar>

        <div className="results-container">
          <p>long loop:<span className="result">{this.state.longLoop.result}</span></p>
          <p>increment:<span className="result">{this.state.increment.result}</span></p>
        </div>
      </div>  
    );
  }
}

export default App;
