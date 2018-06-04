import React from 'react'
import { Card, Image } from 'semantic-ui-react'

class Matchups extends React.Component {
  constructor (props) {
    super(props)
    this.homeNames = this.props.homeTeam.split(' ').pop()
    this.awayNames = this.props.awayTeam.split(' ').pop()

    this.state = {
      awayBorder: 'none',
      homeBorder: 'none',
      selectedTeam: ''
    }
  }

  addPick = (event, data, teamId, opponent) => {
    event.preventDefault()

    this.props.addPick(event, data, teamId, opponent)

    if (this.props.awayTeam === data) {
      this.setState({
        awayBorder: '3px solid chartreuse',
        homeBorder: 'none'
      }, () => { this.removeBorder(data) })
    } else if (this.props.homeTeam === data) {
      this.setState({
        homeBorder: '3px solid chartreuse',
        awayBorder: 'none'
      }, () => { this.removeBorder(data) })
    }
  }

  removeBorder = (data) => {
    
    if (!this.props.picks.includes(data)) {
      this.setState({homeBorder: 'none', awayBorder: 'none'})
    }
  }


  render() {
    return (

      <React.Fragment>
        <div className='left'>
          <Card className='away-teams'
                id={this.props.awayTeam}
                opponent={this.props.homeTeam}
                onClick={(e) => this.addPick(e, this.props.awayTeam, this.props.id, this.props.homeTeam)}
                style={{border: `${this.state.awayBorder}`}} >

            <Card.Content>
              <Image floated='right' size='mini' src={`./logos/${this.awayNames}.png`} style={{margin: '0', height: 'auto', width: '40px'}}/>
            <Card.Header>
              {this.props.awayTeam}
            </Card.Header>
            <Card.Meta>
              0 - 0
            </Card.Meta>
            <Card.Description>
              Last year the {this.awayNames} had a disappointing season....
            </Card.Description>
          </Card.Content>
        </Card>
       </div>

       <div className='at'><h3>-AT-</h3></div>

       <div className='right' >
         <Card className='home-teams'
               id={this.props.homeTeam}
               style={{border: `${this.state.homeBorder}`}}
               opponent={this.props.awayTeam}
               onClick={(e) => this.addPick(e, this.props.homeTeam, this.props.id, this.props.awayTeam)}>

           <Card.Content>
             <Image floated='right' size='mini' src={`./logos/${this.homeNames}.png`} style={{margin: '0', height: 'auto', width: '40px'}}/>
             <Card.Header>
               {this.props.homeTeam}
             </Card.Header>
             <Card.Meta>
               0 - 0
             </Card.Meta>
             <Card.Description>
               Last year the {this.homeNames} had a disappointing season....
             </Card.Description>
           </Card.Content>
           </Card>
         </div>

      </React.Fragment>
    )
  }
}


export default Matchups
