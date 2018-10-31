import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Jumbotron} from 'reactstrap';
import { Web3Provider } from 'react-web3';
import PropTypes from 'prop-types';



class App extends Component {

  constructor( props) {
    super()
    console.log(this.context);
    this.web3 = this.context.web3;
  }
  componentDidMount(){
    
  }
  render() {
    return (
      
      <div className="App">
      <Web3Provider>
        <div className="row">
        <div className="col col-md-12">
        <Jumbotron>
          <h2 className="display-6">Welcome to EtherClub</h2>
          <p className="lead">A club for Ethereum enthusiastic who want to play  and potentially win some Ether!</p>
          <h6>Anyone can join the club after invitation. Joining the club requires a small fee, after that you receive an address to invite others to join the club.</h6>
          <h6>Every two people invited and joining you will receive back the same amount you used to join, so after two invitation you earn some Ether everytime you manage to convince someone else to join.</h6>
          <p className="lead">Game is base on ability, <u>a prize is given to the best seller!</u> After a threshold of member count the best seller will receive the price payed to join times half the count of <b><u>all</u></b> members in the club!</p>
        </Jumbotron>
        </div>
        </div>
        <p>{this.web3.accounts[0]}</p>
        </Web3Provider>
      </div>
    );
  }
}

export default App;
