import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Jumbotron} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1 className="display-3">Welcome to EtherClub</h1>
          <p className="lead">A club for Ethereum enthusiastic who want to play with and potentially win some Ether!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</p>
          <p className="lead">dance dance and pecu call, feed the food to the horses!</p>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
