import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../core/home/Home';
import Users from '../user/users/Users';
import Signup from '../user/signup/Signup';
import Signin from '../auth/signin/Signin';

class MainRouter extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path='/signin' component={Signin} />
        </Switch>
      </div>
    )
  }
}

export default MainRouter;