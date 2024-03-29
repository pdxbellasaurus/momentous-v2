import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalContext from './utils/GlobalState';
import { Container } from 'react-bulma-components';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateEvent from './pages/NewEvent';
import RSVP from './pages/RSVP';
import Foot from './components/Footer';

function App() {

  const [state, setState] = useState({
    logged_in: false,
    username: "",
    id: "",
    onUpdate: (userData) => {
      setState({ ...state, ...userData });
    }
  })

  return (
    <GlobalContext.Provider value={state}>
    <Router>
      <Container>
        <Nav value= {state.logged_in}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/new" component={CreateEvent}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/events/:id" component={RSVP} />
          </Switch>
   <Foot/> 
      </Container>
    </Router>
    </GlobalContext.Provider>
  );
}

export default App;
