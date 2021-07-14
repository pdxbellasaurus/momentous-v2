import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../utils/GlobalState';
import API from '../utils/API';
import {
  Box,
  Container,
  Button,
  Media,
  Heading,
  Content,
  Columns,
} from 'react-bulma-components';

export default function Profile() {
  const { username, email, id } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFiltered] = useState(events);

  useEffect(() => {
    loadEvents();
  }, []);

  function loadEvents() {
    API.getEvents()
      .then((res) => {
        console.log(res.data);

        setEvents(res.data);
        const filteredEvents = res.data.filter(
          (event) => event.owner[0]._id === id
        );

        setFiltered(filteredEvents);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container className='mt-5' color='light' style={{backgroundColor:"#F4B400"}}>
      <Columns className='is-multiline'>
        <Columns.Column className='left' size={4} offset={true}>
          <aside className='menu'>
            <ul className='list'>
              <li className='subtitle is-3'>
                Welcome <strong>{username}</strong>
              </li>
              <li className='box'>{email}</li>
            </ul>
          </aside>
          <Button
            renderAs={Link}
            color='link'
            to='/new'
            className='is-link is-block is-alt is-medium'
          >
            Add Event
          </Button>
        </Columns.Column>

        <Columns.Column size={8}>
          <Box className='content mt-4'>
            <Heading className='h4'>Events:</Heading>

            {filteredEvents.length ? (
              filteredEvents.map((event, index) => {
                return (
                  <article key={index}>
                    <Heading
                      renderAs={Link}
                      color='link'
                      to={'/events/' + event._id}
                    >
                      {event.title}
                    </Heading>
                    <Media>
                      <div className='media-content'>
                        <Content>
                          <p>{event.description}</p>
                        </Content>
                      </div>
                    </Media>
                  </article>
                );
              })
            ) : (
              <p>No events yet!</p>
            )}
          </Box>
        </Columns.Column>
      </Columns>
    </Container>
  );
}
