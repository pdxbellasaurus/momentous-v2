import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import GlobalContext from '../../utils/GlobalState';
import API from '../../utils/API';
import { Button, Navbar, Columns, Icon } from 'react-bulma-components';
import {
  faCalendarDay,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Nav() {
  const userData = useContext(GlobalContext);
  const history = useHistory()

  function handleLogout() {
    API.logoutUser()
      .then((res) => {
        if (!res.data.logged_in) {
          userData.onUpdate(res.data);
          history.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              {userData.logged_in && (
                <>
                  <Button renderAs={Link} color='primary' to='/profile'>
                    <Icon>
                      <FontAwesomeIcon icon={faUser} />
                    </Icon>
                  </Button>
                  <Button
                    className='ml-3'
                    renderAs={Link}
                    color='link'
                    to='/new'
                  >
                    <Icon>
                      <FontAwesomeIcon icon={faPlus} />
                      <FontAwesomeIcon icon={faCalendarDay} />
                    </Icon>
                  </Button>
                </>
              )}
            </Navbar.Container>
        
          <Navbar.Container className='navbar-end' >
            {userData.logged_in && (
              <>
                <Button
                  renderAs={Link}
                  onClick={handleLogout}
                  color='light'
                  to='/logout'
                  style={{ marginLeft: '4rem'}}
                >
                  <Icon>
                    <FontAwesomeIcon alt='Logout' icon={faSignOutAlt} />
                  </Icon>
                </Button>
              </>
            )}
            {!userData.logged_in && (
            
                <Columns  style={{ marginLeft: '4rem', display: 'inline-flex', alignContent: 'end', alignItems: 'center' }}>
                  <Columns.Column>
                    <Button renderAs={Link} color='link' to='/login'>
                      <Icon>
                        <FontAwesomeIcon alt='Login' icon={faSignInAlt} />
                      </Icon>
                    </Button>
                  </Columns.Column>
                  <div
                  
                    className='divider is-vertical is-light'
                   
                    color='light'
                  >
                    OR
                  </div>
                  <Columns.Column>
                    <Button renderAs={Link} color='link' to='/signup'>
                      <Icon>
                        <FontAwesomeIcon alt='Signup' icon={faUserPlus} />
                      </Icon>
                    </Button>
                  </Columns.Column>
                </Columns>
              
            )}
          </Navbar.Container>
          </Navbar.Brand>
        </Navbar>
      </header>
    </GlobalContext.Provider>
  );
}

export default Nav;
