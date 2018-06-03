import React, { Component } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Matchups from './components/Matchups'
import SideNav from './components/SideNav'

import { Button } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    games: [{week_1: []}],
    userCards: [],
    picks: [],
    user: '',
    awayBorder: 'none',
    homeBorder: 'none',
    id: null,
    prevId: null
    }
  }

  componentDidMount() {
    fetch('https://office-pool-nfl-schedule.herokuapp.com/')
    .then(response => response.json())
    .then(response => this.setState({games: response}))
  }


  addPick = (event, team, teamId) => {
    if (this.state.picks.includes(team)) {
      this.setState(
        { picks: this.remove(this.state.picks, team) }, () => { this.validateNumberOfPicks(this.state.picks, teamId) }
      )
    } else {
      this.setState(
        { picks: this.state.picks.concat([team]) }, () => { this.validateNumberOfPicks(this.state.picks, teamId) }
      )
    }
  }

  validateNumberOfPicks = (picks, newId) => {
    console.log(this.state.picks)
    picks.length > 10 ? window.alert('Deselect previous choice to add pick') : null
    this.setState({prevId: this.state.id, id: newId}, /*() => {this.removeErroneousPicks(this.state.prevId, this.state.id)}*/)
  }

  // removeErroneousPicks = (previousId, currentId) => {
  //   if (previousId === currentId) {
  //     console.log('Competing teams')
  //     this.setState({picks: this.state.picks.pop()})
  //   }
  // }

  remove = (array, element) => {
    return array.filter(e => e !== element)
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        <main>
          <SideNav className='SideNav' />

          <section>
            <div className='matchup-headers'>
              <h2>Matchups - Pick 10</h2>
              <div id='submit-button'>
                <Button positive size='large' style={{marginRight: '0', background: 'linear-gradient(#6BF178, #42964B)'}}>Submit Picks</Button>
              </div>
            </div>
            <div className="games" style={{height: '100vh'}}>
              {this.state.games.find(week => week.week_1).week_1.map((team, index) =>
                <Matchups key={index}
                          id={index}
                          addPick={this.addPick}
                          picks={this.state.picks}
                          awayTeam={team.away}
                          homeTeam={team.home} />)}

            </div>
          </section>

        </main>

      </div>
    );
  }
}

export default App;
