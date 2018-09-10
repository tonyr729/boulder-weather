import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom'

import GeneralDisplay from '../../containers/GeneralDisplay/GeneralDisplay';
import AdvancedDisplay from '../../containers/AdvancedDisplay/AdvancedDisplay';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h3>Boulder Weather Data</h3>
          <div className="nav-container">
            <NavLink exact to='/' className='nav-btn' activeClassName='selected'>
              <button className="btn-general">General</button>
            </NavLink>
            <NavLink exact to='/advanced' className='nav-btn'>
              <button className="btn-advanced">Advanced</button>
            </NavLink>
          </div>
        </div>
        <Switch>
          <Route exact path='/' component={GeneralDisplay} />
          <Route exact path='/advanced' component={AdvancedDisplay} />
        </Switch>
      </div>
    );
  }
}

export default App;