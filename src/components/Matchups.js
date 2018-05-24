import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

class Matchups extends React.Component {
  constructor (props) {
    super(props)
    this.homeNames = this.props.homeTeam.split(' ').pop()
    this.awayNames = this.props.awayTeam.split(' ').pop()

    this.state = {
      picks: [],
      counter: 0
    }
  }

  addPick = (event, data) => {
    event.preventDefault()
    this.props.addPick(data)
    console.log(this.props.picks)
  }


  render() {
    return (

      <React.Fragment>
        <div className='left' >
          <Card className='away-teams' id={this.props.awayTeam} onClick={(e) => this.addPick(e, this.props.awayTeam)}>
            <Card.Content>
              <Image floated='right' size='mini' src={`./logos/${this.awayNames}.png`} style={{margin: '0', height: 'auto', width: '40px'}}/>
            <Card.Header>
              {this.props.awayTeam}
            </Card.Header>
            <Card.Meta>
              0 - 0
            </Card.Meta>
            <Card.Description>
              Last year the Bengals had a disappointing season....
            </Card.Description>
          </Card.Content>
        </Card>
       </div>

       <div className='at'><h3>-AT-</h3></div>

      <div className='right' >
        <Card className='home-teams' onClick={(e) => this.addPick(e, this.props.homeTeam)}>
          <Card.Content>
            <Image floated='right' size='mini' src={`./logos/${this.homeNames}.png`} style={{margin: '0', height: 'auto', width: '40px'}}/>
            <Card.Header>
              {this.props.homeTeam}
            </Card.Header>
            <Card.Meta>
              0 - 0
            </Card.Meta>
            <Card.Description>
              Last year the Bengals had a disappointing season....
            </Card.Description>
          </Card.Content>
          </Card>
        </div>

      </React.Fragment>
    )
  }
}


export default Matchups
