import React from 'react'

import AddFunds from './AddFunds'
import { Card, Icon, Image, Button, Modal } from 'semantic-ui-react'
import { StripeProvider, Elements } from 'react-stripe-elements'


class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      size: 'large'
    }
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, size } = this.state

    return (
      <div className='my-pool'>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '66px', marginTop: '11px'}}>
          <Icon name='setting' size='large' color='red'style={{marginRight: '40px'}}></Icon>
          <h2>My Pool</h2>
        </div>
        <Card style={{margin: '10px', height: '170px'}}>
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

      </div>
    )
  }
}

export default SideNav
