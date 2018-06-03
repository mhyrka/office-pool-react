import React from 'react'

import { Card, Icon, Image, Popup, Button, Header, Modal } from 'semantic-ui-react'


class PoolMembers extends React.Component {
  constructor() {
    super()
    this.state = { open: false }
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {

    const { open, dimmer } = this.state

    return (
      <React.Fragment>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='../DM.png' />
            <Card.Header>
              {this.props.name}
            </Card.Header>
            <Card.Meta>
              member since 2015
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.show(true)}>View Picks</Button>
            </div>
          </Card.Content>
        </Card>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content image>
            <Image wrapped size='medium' src='../DM.png' />
            <Modal.Description>
              <Header>{this.props.name}{`'`}s picks</Header>
              <ul style={{textDecoration: 'none'}}>
                {this.props.picks.map((pick, index) => <h4 key={index}>{pick}</h4>)}
              </ul>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content="Done" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default PoolMembers
