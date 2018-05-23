import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Matchups from './components/Matchups'

import SideNav from './components/SideNav'
import { Button } from 'semantic-ui-react'
class App extends Component {
  constructor() {
  super()
  this.state = {
    games: [{week_1: []}]
    }
  }

  componentDidMount() {
    fetch('https://office-pool-nfl-schedule.herokuapp.com/')
    .then(response => response.json())
    .then(response => this.setState({games: response}))
    .then(response => this.makeGames(response))
  }

  makeGames(data) {
    let weekOne = this.state.games.map(games => games.week_1)[0].map(team => team)
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
              {this.state.games.find(week => week.week_1).week_1.map((team, index) => <Matchups key={index} awayTeam={team.away} homeTeam={team.home} />)}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
