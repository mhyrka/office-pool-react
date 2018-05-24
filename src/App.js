import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Matchups from './components/Matchups'
import CheckoutForm from './components/CheckoutForm'

import SideNav from './components/SideNav'
import { Button } from 'semantic-ui-react'
// import { StripeProvider, Elements, InjectedCheckoutForm } from 'react-stripe-elements'


class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    games: [{week_1: []}],
    picks: [],
    counter: 0
    }
  }

  componentDidMount() {
    fetch('https://office-pool-nfl-schedule.herokuapp.com/')
    .then(response => response.json())
    .then(response => this.setState({games: response}))
  }

  addPick = (team) => {
    this.setState({
      counter: this.state.counter+1,
      picks: this.state.picks.concat([team])
    })

  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <main>
          <SideNav className='SideNav'/>

          <section>
            <div className='matchup-headers'>
              <h2>Matchups - Pick 10</h2>
              <div id='submit-button'>
                <Button positive size='large' style={{marginRight: '0', background: 'linear-gradient(#6BF178, #42964B)'}}>Submit Picks</Button>
              </div>
            </div>
            <div className="games" style={{height: '100vh'}}>
              {this.state.games.find(week => week.week_1).week_1.map((team, index) => <Matchups key={index} addPick={this.addPick} picks={this.state.picks} awayTeam={team.away} homeTeam={team.home} />)}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
