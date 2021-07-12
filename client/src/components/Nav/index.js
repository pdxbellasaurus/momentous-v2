import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../utils/GlobalState';
import API from '../../utils/API';
import { Button, Navbar, Columns, Heading, Level, Box } from 'react-bulma-components';

function Nav() {

  const userData = useContext(GlobalContext)
  // const { logged_in } = useContext(GlobalContext);


  function handleLogout() {
      API.logoutUser()
      .then(res => {
          if (!res.data.logged_in ){
          userData.onUpdate(res.data)
          window.location.replace(`http://localhost:3000/login`)
          }
      })
      .catch(err => {
          console.log(err)
      })
  }

  return (
    <GlobalContext.Provider value={userData.logged_in}>
      <header>
        <Navbar role='navigation' aria-label='main navigation'>
          <Navbar.Brand>
            <Navbar.Item renderAs={Link} to='/'>
              <img
                alt='Momentous: a simple community driven events app'
                height='28'
                src='https://user-images.githubusercontent.com/74746211/117521730-20fd6580-af64-11eb-9522-6c4a865877c4.png'
                width='38'
              />
            </Navbar.Item>
            <Navbar.Container className='navbar-start'>

              {userData.logged_in &&
                <>
                  <Button renderAs={Link} color='primary' to='/profile'>
                    Profile
                  </Button>
                  <Button renderAs={Link} color='link' to='/new'>
                    Add Event
                  </Button>
                </>}
               
              
            </Navbar.Container>
          </Navbar.Brand>
          <Navbar.Container className='navbar-end' align='end'>
            {userData.logged_in &&
              <>
               <Heading as='h3' align='center'>Welcome { userData.username}!</Heading>
              <Box></Box>
              <Button renderAs={Link} onClick={handleLogout} color='link' to='/logout'>
                Logout
              </Button>
              </>
            }
            {!userData.logged_in &&
            <Level.Item>
              <Columns>
                <Columns.Column>
                  <Button renderAs={Link} color='link' to='/login'>
                    Login
                  </Button>
                </Columns.Column>
                <div className='divider is-vertical is-light' align='vcentered' color='light'>
                  OR
                </div>
                <Columns.Column>
                  <Button renderAs={Link} color='link' to='/signup'>
                    Sign up
                  </Button>
                </Columns.Column>
              </Columns>
              </Level.Item>
            }
          </Navbar.Container>
        </Navbar>
      </header>
    </GlobalContext.Provider>
  );
}

export default Nav;
