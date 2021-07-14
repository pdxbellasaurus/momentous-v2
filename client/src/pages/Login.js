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
import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../utils/API';
import GlobalContext from '../utils/GlobalState';

function Login() {
  const [formObject, setFormObject] = useState({});
  const userData = useContext(GlobalContext);
  const history = useHistory();
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.loginUser({
      username: formObject.username,
      password: formObject.password,
    }).then((res) => {
      if (res.data.logged_in) {
        //can use context now
        userData.onUpdate(res.data);
        history.push('/profile');
      }
    });
  }
  return (
    <Container style={{ backgroundColor: '#1A237E'}}>    
      <Box style={{ borderColor: '#1A237E', borderWidth: '2', borderStyle: 'solid',  width: 400, margin: 'auto' }}>
        <Heading style={{ margin: '1rem' }} subtitle size={3}>
          Login
        </Heading>
        <Block>
          <Image
            style={{ margin: 'auto' }}
            size={128}
            src='https://user-images.githubusercontent.com/74746211/117521730-20fd6580-af64-11eb-9522-6c4a865877c4.png'
          />
        </Block>
        <Block>Please login to proceed.</Block>
        <form>
          <Form.Field>
            <Form.Label>Username</Form.Label>
            <Form.Control>
              <Form.Input
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
       
        <Button color='success' type='submit' onClick={handleFormSubmit}>
          Submit
        </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
