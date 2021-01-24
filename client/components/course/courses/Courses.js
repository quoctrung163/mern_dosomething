import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';
import auth from '../../../utils/auth-helper';
import Enroll from '../../enrollment/enroll/Enroll';

import { coursesStyles } from './Courses.Styles';

const Courses = props => {
  const classes = coursesStyles();
  const findCommon = course => {
    return !props.common.find(enrolled => {
      return enrolled.course._id == course._id;
    })
  }

  return (
    <GridList cellHeight={220} className={classes.gridList} cols={2}>
      {props.courses.map((course, i) => {
        return (
          findCommon(course) &&
          <GridListTile className={classes.tile} key={i} style={{ padding: 0 }}>
            <Link to={"/course/" + course._id}><img className={classes.image} src={'/api/courses/photo/' + course._id} alt={course.name} /></Link>
            <GridListTileBar className={classes.tileBar}
              title={<Link to={"/course/" + course._id} className={classes.tileTitle}>{course.name}</Link>}
              subtitle={<span>{course.category}</span>}
              actionIcon={
                <div className={classes.action}>
                  {auth.isAuthenticated() ? <Enroll courseId={course._id} /> : <Link to="/signin">Sign in to Enroll</Link>}
                </div>
              }
            />
          </GridListTile>)
      }
      )}
    </GridList>
  )
}

Courses.propTypes = {
  courses: PropTypes.array.isRequired
}

export default Courses;