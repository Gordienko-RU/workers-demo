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
      inputValue: 8000000,
      connectionsAmount: null,
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleWorker = this.handleWorker.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.receiveResponse = this.receiveResponse.bind(this);
    this.worker = new SharedWorker('worker.js');
  }
  
  componentDidMount() {
    this.worker.port.addEventListener('message', this.receiveResponse);
    this.worker.port.start();
  }

  receiveResponse(e) {
    console.log(e);
    const { stringLength, connections, error } = e.data;

    if (connections) {
      this.setState({ connectionsAmount: connections });
    }

    if (stringLength) {
      this.setState({ longLoop: { result: stringLength }});
    }

    if (error) {
      this.setState({ longLoop: { result: 'error' }});
    }
  }

  handleIncrement() {
    this.setState({ increment: { result: this.state.increment.result + 1 }});
  }

  handleWorker() {
    this.setState({ longLoop: { result: '' }})
    this.worker.port.postMessage({ iterationsCount: this.state.inputValue });
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
          <p>connections amount:<span className="result">{this.state.connectionsAmount}</span></p>
        </div>
      </div>  
    );
  }
}

export default App;
