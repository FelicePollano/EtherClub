import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Jumbotron} from 'reactstrap';

class App extends Component {

  componentDidMount(){
    
  }
  render() {
    return (
      <div className="App">
        <div className="row">
        <div className="col col-md-12">
        <Jumbotron>
          <h1 className="display-3">Welcome to EtherClub</h1>
          <p className="lead">A club for Ethereum enthusiastic who want to play  and potentially win some Ether!</p>
          <p>Anyone can join the club after invitation. Joining the club requires a small fee, after that you receive an address to invite others to join the club.</p>
          <p>Every two people invited you will receive back the same amount you used to join, so after two invitation you earn some Ether everytime you manage to convince someone else to join.</p>
          <p className="lead">Game is base on ability, <u>a prize is given to the best seller!</u> After a threshold of member count the best seller will receive the price payed to join times half the count of <b><u>all</u></b> members in the club.</p>
        </Jumbotron>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
