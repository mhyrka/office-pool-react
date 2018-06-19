import React from 'react'

import { Card, Image, Button, Header, Modal, Segment, Form } from 'semantic-ui-react'


class PoolMembers extends React.Component {
  constructor(props) {
    super(props)
    this.names = this.props.name.split(' ').pop()
    this.state = {
      open: false,
      userId: 0,
      showUpdateInfo: false,
      newUserName: ''
     }
  }


  show = dimmer => (event) => {
    this.setState({ dimmer, open: true })
    this.setUserId(event)
  }
  close = () => this.setState({ open: false })

  setUserId = (event) => {
    event.preventDefault()
    this.setState({userId: this.props.userId}, () => console.log(this.state.userId))
    this.props.setUserId(this.props.userId)
  }


  deletePicks = (event) =>{
    const url = `https://office-pool-nfl-schedule.herokuapp.com/userpicks/${this.state.userId}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(res => this.close())
  }

  updateUserName = (event) => {
    event.preventDefault()
    const url = `https://office-pool-nfl-schedule.herokuapp.com/users/${this.state.userId}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({user_name : this.state.newUserName}),
    })
    .then(response => response.json())
    .then(response => this.setState({showUpdateInfo: false}))
  }

  handleChange = (event) => {
    this.setState({newUserName: event.target.value}, () => console.log(this.state.newUserName))
  }

  closeUpdateModal = () => {
    this.setState({showUpdateInfo: false})
  }

  toggleShowUpdate = () => {
    this.setState({showUpdateInfo: true})
  }

  render() {

    const { open, dimmer } = this.state

    return (
      <React.Fragment>
        <Card style={{height: '170px'}} onClick={(event) => this.props.setUserId(event, this.props.userId)}>
          <Card.Content>
            <Image floated='right' size='mini' src={`../${this.names}.png`} />
            <Card.Header>
              {this.props.name}
            </Card.Header>
            <Card.Meta>
              member since 2010
            </Card.Meta>
            <Modal trigger={<Button size='mini' onClick={this.toggleShowUpdate}>Edit Info</Button>}
                   centered='true'
                   open={this.state.showUpdateInfo}>

              <Modal.Header style={{textAlign:'center'}}>
                <label>New Username</label>
              </Modal.Header>
                <Form style={{display:'flex',
                              justifyContent: 'center',
                              alignItems:'center',
                              flexDirection:'column'}}>
                  <Form.Field style={{width:'250px', marginTop:'50px'}}>
                    <input placeholder='' onChange={this.handleChange}/>
                  </Form.Field>
                  <div style={{display:'flex', flexDirection:'row'}}>
                    <Button color={'red'}
                            style={{marginTop:'30px', marginBottom:'30px'}}
                            onClick={this.closeUpdateModal}>Cancel</Button>
                    <Button color={'green'}
                            style={{marginTop:'30px', marginBottom:'30px'}}
                            onClick={this.updateUserName}>Accept</Button>
                  </div>
                </Form>

            </Modal>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'
                      onClick={this.show(true)}
                      userid={this.props.userId}>View Picks</Button>
            </div>
          </Card.Content>
        </Card>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content image>
            <Image wrapped size='medium' src={`../${this.names}.png`} />
            <Modal.Description>
              <Header>{this.props.name}{"'"}s Picks</Header>
                {this.props.userPicks.length !== 0 ?
                  <Segment raised style={{width:'250px'}}>
                    <ul style={{textDecoration: 'none'}}>
                      {this.props.userPicks.map((pick, index) => <h4 key={index}>{pick.team_name}</h4>)}
                    </ul>
                    <Button color={'red'} size='mini' onClick={this.deletePicks}>Delete Picks</Button>
                  </Segment>
                :  null }
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark'
                    labelPosition='right'
                    content="Done"
                    onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default PoolMembers
