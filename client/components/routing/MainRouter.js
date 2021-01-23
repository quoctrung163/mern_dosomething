import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../core/home/Home';
import Users from '../user/users/Users';
import Signup from '../user/signup/Signup';
import Signin from '../auth/signin/Signin';
import EditProfile from './../user/edit-profile/EditProfile';
import Profile from '../user/profile/Profile';
import PrivateRoute from './PrivateRoute';
import Menu from '../core/menu/Menu';

class MainRouter extends Component {
  // Remove the server-side injected CSS when React component mounts
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path='/signin' component={Signin} />
          <PrivateRoute path='/user/edit/:userId' component={EditProfile} />
          <Route path='/user/:userId' component={Profile} />
        </Switch>
      </div>
    )
  }
}

export default MainRouter;