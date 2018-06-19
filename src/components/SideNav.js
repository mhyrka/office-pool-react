import React from 'react'

import AddFunds from './AddFunds'
import PoolMembers from './PoolMembers'

import { Card, Icon, Image, Button, Modal } from 'semantic-ui-react'
import { StripeProvider } from 'react-stripe-elements'


class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      size: 'large',
      userCards: [],
      userPicks: [],
      userId: 1
    }
  }

  componentDidMount() {
    fetch('https://office-pool-nfl-schedule.herokuapp.com/users')
    .then(response => response.json())
    .then(response => this.setUserCards(response))

    this.fetchUserPicks = () => {
      fetch(`https://office-pool-nfl-schedule.herokuapp.com/userpicks/${this.state.userId}`)
      .then(response => response.json())
      .then(response => this.filterPicks(response))

    }
  }


  setUserCards = (data) => {
    let userData = []
    data.user.map(user => userData.push(user))
    this.setState({userCards: this.state.userCards.concat(userData)})
  }

  filterPicks = (data) => {

    let userPicks = []
    data.map(pick => userPicks.push(pick))
    this.setState({userPicks: userPicks})
  }

  setUserId = (event, userId) => {
    this.setState({ userId: userId }, () => this.viewPicks())
    this.props.setUserId(event, userId)
  }

  viewPicks = () => {
    this.fetchUserPicks()
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


  render() {

    return (
      <div className='my-pool'>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '66px', marginTop: '11px'}}>
          <Icon name='setting' size='large' color='red'style={{marginRight: '40px'}}></Icon>
          <h2>My Pool</h2>
        </div>
        <div className='player-cards'>
          <Card style={{margin: '10px', height: '170px'}} >
            <Card.Content>
              <Image floated='right' size='mini' src='./MM.png' />
              <Card.Header>
                Marcus Mariota (you)
              </Card.Header>
              <Card.Meta>
                Member since 2015
              </Card.Meta>
              <Button basic color='green' size='mini'>See Picks</Button>
            </Card.Content>
            <Card.Content extra >
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems:'center' }}>
                <p>Current Balance: $0.00</p>
                <Modal trigger={<Button basic color='green' size='small' style={{float: 'right', padding: 'none'}} onClick={this.show('small')}>Deposit</Button>}>
                  <Modal.Header id='modal-header' style={{background: 'linear-gradient(#6BF178, #42964B)'}}>Add Funds</Modal.Header>
                  <Modal.Content image>
                    <Modal.Description>
                      <StripeProvider apiKey="pk_test_12345">
                        <AddFunds />
                      </StripeProvider>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>

              </div>
            </Card.Content>
          </Card>

          {this.state.userCards.map((user, index) => {
            return <PoolMembers className='pool-members'
                                key={index}
                                userCards={user}
                                name={user.user_name}
                                userId={user.id}
                                userPicks={this.state.userPicks}
                                setUserId={this.setUserId}
                                viewPicks={this.viewPicks} />

          })}
        </div>
      </div>
    )
  }
}

export default SideNav
