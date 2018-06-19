import React, { Component } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Matchups from './components/Matchups'
import SideNav from './components/SideNav'

import { Button, Header, Image, Modal } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
    this.state = {
      games: [{week_1: []}],
      userCards: [],
      picks: [],
      userId: 1,
      pickIds: [],
      isPosted: false,
      error: false,
      open: false,
      reload: false
    }
  }

  show = dimmer => () => this.setState({ dimmer, open: true }, this.filterPicksById(this.state.picks))
  close = () => this.setState({ open: false, reload: true })

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

  filterPicksById = (picks) => {

    let selectedTeamIds = []

    fetch('https://office-pool-nfl-schedule.herokuapp.com/picks')
    .then(response => response.json())
    // .then(response => picks.filter(teamName => teamName === response.picks.team_name))
    .then(response => {
      for (let i = 0; i < response.picks.length; i++) {
        for (let j = 0; j < this.state.picks.length; j++) {
          if (this.state.picks[j] === response.picks[i].team_name) {
            selectedTeamIds.push(response.picks[i].id)
          }
        }
      }

    })
    .then(res => this.setState({pickIds: selectedTeamIds}))
  }

  validateNumberOfPicks = (picks, pickIds, team) => {
    if (picks.length > 10) {
      window.alert('Deselect previous choice to add pick')
    }
  }

  toggleIsPosted = () => {
    this.setState({isPosted: false})
  }

  submitPicks = (event) => {
    event.preventDefault()
    if (this.state.picks.length === 10) {
      for (let i = 0; i < this.state.picks.length; i++) {
        fetch('https://office-pool-nfl-schedule.herokuapp.com/userpicks', {
           method: 'POST',
           headers: new Headers ({
           'content-type': 'application/json',
          }),
            body: JSON.stringify({
              user_id: this.state.userId,
              team_id: this.state.pickIds[i]
            })
          })
          .then(response => response.json())
          .then(response => {
              response.error
              ? this.setState({ error: true })
              : this.setState({ error: false })
            })
          .then(this.close())
          .then(this.setState({isPosted: true, picks: []}, () => {this.child.current.resetBorders()}))
      }

      } else {
        window.alert('Please Choose 10 teams')
      }
  }

  setUserId = (event, props) => {
    // event.preventDefault()
    this.setState({ userId: props })
  }

  remove = (array, element) => {
    return array.filter(e => e !== element)
  }

  render() {

    const { open, dimmer } = this.state

    return (
      <div className="App">
        <Navbar />
        <main>
          <SideNav className='SideNav' setUserId={this.setUserId} />

          <section>
            <div className='matchup-headers'>
              <h2>Matchups - Pick {10 - this.state.picks.length}</h2>
              <div id='submit-button'>
                <Button positive size='large'
                                 style={{marginRight: '0', background: 'linear-gradient(#6BF178, #42964B)'}}
                                 onClick={this.show(true)}>Submit Picks</Button>
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
                          ref={this.child}
                          isCleared={this.state.isPosted}
                          toggleIsPosted={this.toggleIsPosted}
                          />)}

            </div>
          </section>

        </main>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Confirm Picks?</Modal.Header>
          <Modal.Content image>
            {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
            <Modal.Description>
              <Header>Your Picks</Header>
              <ul>
                {this.state.picks.map((pick, index) => <h4 key={index}>{pick}</h4>)}
              </ul>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Confirm"
              onClick={this.submitPicks}
            />
          </Modal.Actions>
        </Modal>

      </div>
    );
  }
}

export default App;
