import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalContext from './utils/GlobalState';
import { Container } from 'react-bulma-components';
// import About from './pages/About';
// import EventList from './pages/EventList';
// import Profile from './pages/Profile';
import Nav from './components/Nav/index';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateEvent from './pages/NewEvent';
// import { Footer } from './components/Footer';

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
          </Switch>
   
      </Container>
    </Router>
    </GlobalContext.Provider>
  );
}

export default App;
