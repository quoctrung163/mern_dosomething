import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { create } from '../../../utils/api-enrollment';
import auth from '../../../utils/auth-helper';
import { Redirect } from 'react-router-dom';

import { enrollStyles } from './Enroll.Styles';

const Enroll = props => {
  const classes = enrollStyles();
  const [values, setValues] = useState({
    enrollmentId: '',
    error: '',
    redirect: false
  });
  const jwt = auth.isAuthenticated();
  const clickEnroll = () => {
    create({
      courseId: props.courseId
    }, {
      t: jwt.token
    }).then(data => {
      console.log(data);
      if (data && data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, enrollmentId: data._id, redirect: true })
      }
    })
  }

  if (values.redirect) {
    return (
      <Redirect
        to={`/learn/${values.enrollmentId}`}
      />
    )
  }

  return (
    <Button variant="contained" color="secondary"
      onClick={clickEnroll}>
      Enroll
    </Button>
  )
}

Enroll.propTypes = {
  courseId: PropTypes.string.isRequired
}

export default Enroll;