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
    user: 'Marcus Mariota',
    pickIds: [],
    error: false
    }
  }

  componentDidMount() {
    fetch('https://office-pool-nfl-schedule.herokuapp.com/')
    .then(response => response.json())
    .then(response => this.setState({games: response}))
  }


  addPick = (event, team, teamId, opp) => {

    if (this.state.picks.includes(team)) {
      this.setState(
        { picks: this.remove(this.state.picks, team) },
        () => { this.validateNumberOfPicks(this.state.picks, this.state.pickIds, team) }
      )
    } else if (this.state.picks.includes(opp)) {
      const picks = this.remove(this.state.picks, opp)
      this.setState(
        { picks: picks.concat(team) },
        () => { this.validateNumberOfPicks(this.state.picks, this.state.pickIds, team) }
      )
    } else {
      this.setState(
        { picks: this.state.picks.concat([team]) },
        () => { this.validateNumberOfPicks(this.state.picks, this.state.pickIds, team) }
      )
    }
  }

  validateNumberOfPicks = (picks, pickIds, team) => {
    picks.length > 10 ? window.alert('Deselect previous choice to add pick') : null
    console.log(this.state.picks)
  }

  submitPicks = (event) => {
    event.preventDefault()
    fetch('https://office-pool-nfl-schedule.herokuapp.com/user_picks', {
           method: 'POST',
           headers: new Headers ({
           'content-type': 'application/json',
          }),
            body: JSON.stringify({
              user_name: this.state.user,
              picks: this.state.picks
            })
            })
            .then(response => response.json())
            .then(response => {
                response.error
                ? this.setState({ error: true })
                : this.setState({ error: false })
            })
  }


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
                <Button positive size='large'
                                 style={{marginRight: '0', background: 'linear-gradient(#6BF178, #42964B)'}}
                                 onClick={this.submitPicks}>Submit Picks</Button>
              </div>
            </div>
            <div className="games" style={{height: '100vh'}}>
              {this.state.games.find(week => week.week_1).week_1.map((team, index) =>
                <Matchups key={index}
                          id={index}
                          addPick={this.addPick}
                          picks={this.state.picks}
                          awayTeam={team.away}
                          homeTeam={team.home}
                          border={this.state.border} />)}

            </div>
          </section>

        </main>

      </div>
    );
  }
}

export default App;
