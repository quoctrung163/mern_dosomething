import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import PeopleIcon from '@material-ui/icons/Group'
import CompletedIcon from '@material-ui/icons/VerifiedUser'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { read, update } from '../../../utils/api-course'
import { enrollmentStats } from '../../../utils/api-enrollment'
import { Link, Redirect } from 'react-router-dom'
import auth from '../../../utils/auth-helper'
import DeleteCourse from '../delete-course/DeleteCourse'
import Divider from '@material-ui/core/Divider'
import NewLesson from '../new-lesson/NewLesson'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Enroll from '../../enrollment/enroll/Enroll';

import { courseStyles } from './Course.Styles';

const Course = ({ match }) => {
  const classes = courseStyles();
  const [stats, setStats] = useState({});
  const [course, setCourse] = useState({ instructor: {} });
  const [values, setValues] = useState({
    redirect: false,
    error: ''
  });
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ courseId: match.params.courseId }, signal).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCourse(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    }
  }, [match.params.courseId]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    enrollmentStats({ courseId: match.params.courseId },
      { t: jwt.token }, signal).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          console.log(data);
          setStats(data);
        }
      });

    return function cleanup() {
      abortController.abort();
    }
  }, [match.params.courseId]);

  const removeCourse = course => {
    setValues({ ...values, redirect: true })
  }

  const addLesson = course => {
    setCourse(course);
  }

  const clickPublish = () => {
    if (course.lessons.length > 0) {
      setOpen(true);
    }
  }

  const publish = () => {
    let courseData = new FormData()
    courseData.append('published', true)
    update({
      courseId: match.params.courseId
    }, {
      t: jwt.token
    }, courseData).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCourse({ ...course, published: true });
        setOpen(false);
      }
    });
  }

  const handleClose = () => {
    setOpen(false);
  }

  if (values.redirect) {
    return <Redirect to={'/teach/courses'} />
  }

  const imageUrl = course._id
    ? `/api/courses/photo/${course._id}?${new Date().getTime()}`
    : '/api/courses/defaultphoto';

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={course.name}
          subheader={<div>
            <Link to={"/user/" + course.instructor._id} className={classes.sub}>By {course.instructor.name}</Link>
            <span className={classes.category}>{course.category}</span>
          </div>
          }
          action={<>
            {auth.isAuthenticated().user && auth.isAuthenticated().user._id == course.instructor._id &&
              (<span className={classes.action}>
                <Link to={"/teach/course/edit/" + course._id}>
                  <IconButton aria-label="Edit" color="secondary">
                    <Edit />
                  </IconButton>
                </Link>
                {!course.published ? (<>
                  <Button color="secondary" variant="outlined" onClick={clickPublish}>{course.lessons.length == 0 ? "Add atleast 1 lesson to publish" : "Publish"}</Button>
                  <DeleteCourse course={course} onRemove={removeCourse} />
                </>) : (
                    <Button color="primary" variant="outlined">Published</Button>
                  )}
              </span>)
            }
            {course.published && (<div>
              <span className={classes.statSpan}><PeopleIcon /> {stats.totalEnrolled} enrolled </span>
              <span className={classes.statSpan}><CompletedIcon /> {stats.totalCompleted} completed </span>
            </div>
            )}

          </>
          }
        />
        <div className={classes.flex}>
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={course.name}
          />
          <div className={classes.details}>
            <Typography variant="body1" className={classes.subheading}>
              {course.description}<br />
            </Typography>

            {course.published && <div className={classes.enroll}><Enroll courseId={course._id} /></div>}


          </div>
        </div>
        <Divider />
        <div>
          <CardHeader
            title={<Typography variant="h6" className={classes.subheading}>Lessons</Typography>
            }
            subheader={<Typography variant="body1" className={classes.subheading}>{course.lessons && course.lessons.length} lessons</Typography>}
            action={
              auth.isAuthenticated().user && auth.isAuthenticated().user._id == course.instructor._id && !course.published &&
              (<span className={classes.action}>
                <NewLesson courseId={course._id} addLesson={addLesson} />
              </span>)
            }
          />
          <List>
            {course.lessons && course.lessons.map((lesson, index) => {
              return (<span key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={lesson.title}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </span>)
            }
            )}
          </List>
        </div>
      </Card>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Publish Course</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Publishing your course will make it live to students for enrollment.
          </Typography>
          <Typography variant="body1">
            Make sure all lessons are added and ready for publishing.
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
                </Button>
          <Button onClick={publish} color="secondary" variant="contained">
            Publish
                </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Course;
