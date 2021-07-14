import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Block,
  Image,
  Box,
  Heading,
  Section,
  Media,
  Content,
} from 'react-bulma-components';
import API from '../utils/API';
import GlobalContext from '../utils/GlobalState';

export default function RSVP() {
  const [event, setEvent] = useState({});
  let { id } = useParams();

  const userData = useContext(GlobalContext);

  const [owner, setOwner] = useState('');
  const [formObject, setFormObject] = useState({});
  const [guests, setGuests] = useState([]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  useEffect(() => {
    API.getEvent(id)
      .then((res) => {
        setOwner(res.data.owner[0]);
        setEvent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRSVP = (event) => {
    event.preventDefault();
    API.getEvent(id).then((res) => {
      setGuests(res.data.guests);

      API.updateEvent(id, {
        guests: [
          ...guests,
          {
            user: userData.id,
            comment: formObject.comment,
          },
        ],
      });
    });
  };
  let newStartDate = new Date(event.start_date).toLocaleString();
  let newEndDate = new Date(event.end_date).toLocaleString();

  return (
    <Container backgroundColor='link'>
      <Block backgroundColor='link' style={{ margin: '1rem' }}>
        {' '}
      </Block>

      <Box style={{ width: 750, margin: 'auto' }}>
        <Block>
          <Image
            style={{ margin: 'auto' }}
            size={128}
            src='https://user-images.githubusercontent.com/74746211/117521730-20fd6580-af64-11eb-9522-6c4a865877c4.png'
          />
        </Block>
        <Block>
          <Heading subtitle size={3}>
            {event.title}
          </Heading>
          <Heading className='subtitle'>
            by {owner.firstName} {owner.lastName}
          </Heading>
          <Content>
            <time>{newStartDate} </time> to <time> {newEndDate}</time>
            <br />
            <strong>{event.venue} </strong>
            <br />
            {event.description}
          </Content>
        </Block>
        <hr />
        <Section>
          <Media>
            {event.guests ? (
              event.guests.map((guest, index) => {
                return (
                  <Media.Item align='center' key={index}>
                    <Content>
                      <p>
                        <strong>
                          {guest.user.firstName} {guest.user.lastName}
                        </strong>
                        <br />
                        {guest.comment}
                        <br />
                      </p>
                    </Content>
                  </Media.Item>
                );
              })
            ) : (
              <p>No guests yet!</p>
            )}
          </Media>
          <form onSubmit={handleRSVP}>
            <Form.Field>
              <Form.Control renderAs='p'>
                <Form.Textarea
                  placeholder='Add a comment...'
                  label='comment'
                  name='comment'
                  onChange={handleInputChange}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control renderAs='p'>
                <Button color='link' type='submit'>
                  RSVP
                </Button>
              </Form.Control>
            </Form.Field>
          </form>
        </Section>
      </Box>
    </Container>
  );
}
