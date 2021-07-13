import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Media, Heading, Content, Tile } from 'react-bulma-components';

export function List({ children }) {
  return (
    <Container className='columns is-multiline' >
           {children}
    </Container>
  );
}

export function Event({
index,
  title,
  description,
  id,
// owner,
// firstName,
// lastName
}
) {
                   return(  
               <Tile >      
              <Card  className='is-one-third'  style={{ margin: 'auto' }} key={index}>
        <Card.Content>
      <Media>
            <Media.Item>
          <Heading size={4}>
        <Link to={'/events/' + id}>{title}</Link>
          </Heading>
          <Heading subtitle size={6}>
           Hosted by:
           {/* {owner.firstName} {owner.LastName} */}
          </Heading>
        </Media.Item>
      </Media>
      <Content>
      {description}
               <br />
        </Content>
      <a href="/">RSVP</a>

    </Card.Content>
  </Card>
  </Tile>
  )
}