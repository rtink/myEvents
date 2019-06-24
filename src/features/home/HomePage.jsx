import React from 'react';
import { Segment, Container, Header, Image, Button, Icon } from 'semantic-ui-react';

const HomePage = ({history}) => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/images/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          MyEvents
        </Header>
        <Button 
          onClick={() => history.push('/events')}
          size='huge' 
          inverted
        >
          Get started! Join the fun!
          <Icon name='right arrow' inverted />
        </Button>
      </Container>
    </Segment>
  )
}

export default HomePage;
