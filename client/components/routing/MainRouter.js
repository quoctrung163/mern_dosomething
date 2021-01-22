import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../core/home/Home';
import Users from '../user/users/Users';
import Signup from '../user/signup/Signup';

class MainRouter extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    )
  }
}

export default MainRouter;
