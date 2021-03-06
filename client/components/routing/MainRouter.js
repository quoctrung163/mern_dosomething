import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../core/home/Home';
import Users from '../user/users/Users';
import Signup from '../user/signup/Signup';
import Signin from '../auth/signin/Signin';
import EditProfile from './../user/edit-profile/EditProfile';
import Profile from '../user/profile/Profile';
import PrivateRoute from './PrivateRoute';
import Menu from '../core/menu/Menu';
import NewCourse from '../course/new-course/NewCourse';
import Course from '../course/course/Course';
import EditCourse from '../course/edit-course/EditCourse';
import MyCourses from '../course/my-courses/MyCourses';
import Enrollment from '../enrollment/enrollment/Enrollment';

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/course/:courseId" component={Course} />
        <PrivateRoute path="/teach/courses" component={MyCourses} />
        <PrivateRoute path="/teach/course/new" component={NewCourse} />
        <PrivateRoute path="/teach/course/edit/:courseId" component={EditCourse} />
        <PrivateRoute path="/teach/course/:courseId" component={Course} />
        <PrivateRoute path="/learn/:enrollmentId" component={Enrollment} />
      </Switch>
    </div>
  )
}

export default MainRouter;