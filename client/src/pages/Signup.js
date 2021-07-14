import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Button,
  Icon,
  Block,
  Image,
  Box,
  Heading,
  Container,
} from 'react-bulma-components';
import {
  faCheck,
  faEnvelope,
  faExclamationTriangle,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../utils/API';
import GlobalContext from '../utils/GlobalState';

function Signup() {
  const [formObject, setFormObject] = useState({});
  const userData = useContext(GlobalContext);
  let history = useHistory();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.saveUser({
      username: formObject.username,
      firstName: formObject.firstName,
      lastName: formObject.lastName,
      password: formObject.password,
      email: formObject.email,
    })
      .then((res) => {
        if (res.data.logged_in) {
          userData.onUpdate(res.data);
          console.log('saving the user');
          history.push('/profile');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container backgroundColor='link'>
      <Box backgroundColor='link'> </Box>
      <Box style={{ width: 700, margin: 'auto' }}>
        <Heading style={{ margin: '1rem' }} subtitle size={3}>
          Signup
        </Heading>
        <Block>
          <Image
            style={{ margin: 'auto' }}
            size={128}
            src='https://user-images.githubusercontent.com/74746211/117521730-20fd6580-af64-11eb-9522-6c4a865877c4.png'
          />
        </Block>
        <Block>Please signup to proceed.</Block>
        <form>
          <Form.Field kind='group'>
            <Form.Label>First Name</Form.Label>
            <Form.Control>
              <Form.Input
                onChange={handleInputChange}
                type='text'
                placeholder='First Name'
                name='firstName'
              />
            </Form.Control>

            <Form.Label>Last Name</Form.Label>
            <Form.Control>
              <Form.Input
                onChange={handleInputChange}
                type='text'
                placeholder='Last Name'
                name='lastName'
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Username</Form.Label>
            <Form.Control>
              <Form.Input
                color='success'
                onChange={handleInputChange}
                type='text'
                placeholder='Username'
                name='username'
              />
              <Icon align='left' size='small'>
                <FontAwesomeIcon icon={faUser} />
              </Icon>
              <Icon align='right' size='small'>
                <FontAwesomeIcon icon={faCheck} />
              </Icon>
            </Form.Control>
            <Form.Help color='success'>This username is available</Form.Help>
          </Form.Field>

          <Form.Field>
            <Form.Label>Email Address</Form.Label>
            <Form.Control>
              <Form.Input
                color='danger'
                onChange={handleInputChange}
                type='email'
                placeholder='Email'
                name='email'
              />
              <Icon align='left' size='small'>
                <FontAwesomeIcon icon={faEnvelope} />
              </Icon>
              <Icon align='right' size='small'>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </Icon>
            </Form.Control>
            <Form.Help color='danger'>This email is invalid</Form.Help>
          </Form.Field>

          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Control>
              <Form.Input
                onChange={handleInputChange}
                placeholder='Password'
                type='password'
                name='password'
              />
              <Icon align='left' size='small'>
                <FontAwesomeIcon icon={faLock} />
              </Icon>
              <Icon align='right' size='small'>
                <FontAwesomeIcon icon={faCheck} />
              </Icon>
            </Form.Control>
          </Form.Field>

          <Form.Control>
            <Button color='success' type='submit' onClick={handleFormSubmit}>
              Submit
            </Button>
          </Form.Control>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;
