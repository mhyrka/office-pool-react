import React from 'react'

import { Card, Icon, Image, Button } from 'semantic-ui-react'

const CardExampleCard = () => (
  <div className='my-pool'>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '66px', marginTop: '11px'}}>
      <Icon name='setting' size='large' color='red'></Icon>
      <h2>My Pool</h2>
    </div>
    <Card style={{margin: '10px', height: '170px'}}>
      <Card.Content>
        <Image floated='right' size='mini' src='./MM.png' />
        <Card.Header>
          Marcus Mariota
        </Card.Header>
        <Card.Meta>
          Member since 2015
        </Card.Meta>
        <Button basic color='green' size='mini'>See Picks</Button>
      </Card.Content>
      <Card.Content extra >
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems:'center' }}>
          <p>Current Balance: $0.00</p>
          <Button basic color='green' size='small' style={{float: 'right'}}>Deposit</Button>
        </div>
      </Card.Content>
    </Card>

  </div>
)

export default CardExampleCard
