import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import auth from '../../../utils/auth-helper';
import { listByInstructor } from '../../../utils/api-course';
import { Redirect, Link } from 'react-router-dom';

import { myCoursesStyles } from './MyCourses.Styles';

const MyCourses = () => {
  const classes = myCoursesStyles();
  const [courses, setCourses] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByInstructor({
      userId: jwt.user._id
    }, { t: jwt.token }, signal).then(data => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setCourses(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    }
  }, []);

  if (redirectToSignin) {
    return <Redirect to='/signin' />
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Courses
          <span className={classes.addButton}>
            <Link to="/teach/course/new">
              <Button color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon>  New Course
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {courses.map((course, i) => {
            return <Link to={"/teach/course/" + course._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar src={'/api/courses/photo/' + course._id + "?" + new Date().getTime()} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText primary={course.name} secondary={course.description} className={classes.listText} />
              </ListItem>
              <Divider />
            </Link>
          })}
        </List>
      </Paper>
    </div>
  )
}

export default MyCourses;