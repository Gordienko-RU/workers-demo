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
      inputValue: 8000000
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleWorker = this.handleWorker.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.receiveResponse = this.receiveResponse.bind(this);
    this.worker = new Worker('worker.js');
  }
  
  componentDidMount() {
    this.worker.addEventListener('message', this.receiveResponse);
  }

  receiveResponse(e) {
    if (e.data.successfully) {
      this.setState({ longLoop: { result: 'DONE' }})
    }
  }

  handleIncrement() {
    this.setState({ increment: { result: this.state.increment.result + 1 }});
  }

  handleWorker() {
    this.setState({ longLoop: { result: '' }})
    this.worker.postMessage({ iterationsCount: this.state.inputValue });
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
          <Button bsStyle="primary" onClick={this.handleWorker}>long loop</Button>
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
