SHORT CARDS FOR OTHER USERS

<Card style={{margin: '10px', height: '70px'}}>
<Card.Content>
  <Image floated='right' size='mini' src='./MM.png' />
  <Card.Header>
    Steve Sanders
  </Card.Header>
  <Card.Meta>
    Member since 2015
  </Card.Meta>
</Card.Content>

</Card>



//SideNav userCards
<Card>
  <Card.Content>
    <Image floated='right' size='mini' src='../MM.png' />
    <Card.Header>
      {users.user_names}
    </Card.Header>
    <Card.Meta>
      member since 2015
    </Card.Meta>
  </Card.Content>
  <Card.Content extra>
    <div className='ui two buttons'>
      <Button basic color='green'>View Picks</Button>
    </div>
  </Card.Content>
</Card>
