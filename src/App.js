import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import applicationConfig from './config/config';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Alert from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <div className='container'></div>
              <Navbar></Navbar>
              <div className='container'>
                <Alerts></Alerts>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/About' component={About} />
                  <Route exact path='/Register' component={Register} />
                  <Route exact path='/Login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
