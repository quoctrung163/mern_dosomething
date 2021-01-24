import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { listPublished } from '../../../utils/api-course';
import { listEnrolled } from '../../../utils/api-enrollment';
import Typography from '@material-ui/core/Typography';
import auth from '../../../utils/auth-helper';
import Courses from '../../course/courses/Courses';
import Enrollments from '../../enrollment/enrollments/Enrollments';

import { homeStyles } from './Home.Styles';

const Home = () => {
  const classes = homeStyles();
  const jwt = auth.isAuthenticated();
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listEnrolled({ t: jwt.token }, signal).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setEnrolled(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listPublished(signal).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCourses(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    }
  }, []);

  return (
    <div className={classes.extraTop}>
      {auth.isAuthenticated().user && (
        <Card className={`${classes.card} ${classes.enrolledCard}`}>
          <Typography variant="h6" component="h2" className={classes.enrolledTitle}>
            Courses you are enrolled in
        </Typography>
          {enrolled.length != 0 ? (<Enrollments enrollments={enrolled} />)
            : (<Typography variant="body1" className={classes.noTitle}>No courses.</Typography>)
          }
        </Card>
      )}
      <Card className={classes.card}>
        <Typography variant="h5" component="h2">
          All Courses
        </Typography>
        {(courses.length != 0 && courses.length != enrolled.length) ? (<Courses courses={courses} common={enrolled} />)
          : (<Typography variant="body1" className={classes.noTitle}>No new courses.</Typography>)
        }
      </Card>
    </div>
  )
}

export default Home;