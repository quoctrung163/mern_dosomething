import React, { useState, useEffect } from 'react';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CompletedIcon from '@material-ui/icons/VerifiedUser'
import InProgressIcon from '@material-ui/icons/DonutLarge'
import { Link } from 'react-router-dom'
import { enrollmentsStyles } from './Enrollments.Styles';

const Enrollments = props => {
  const classes = enrollmentsStyles();
  return (
    <div>
      <GridList cellHeight={120} className={classes.gridList} cols={4}>
        {props.enrollments.map((course, i) => (
          <GridListTile key={i} className={classes.tile}>
            <Link to={`/learn/${course._id}`}>
              <img className={classes.image}
                src={`/api/courses/photo/${course.course._id}`}
                alt={course.course.name}
              />
            </Link>
            <GridListTileBar
              className={classes.tileBar}
              title={<Link to={`/learn/${course._id}`} className={classes.tileTitle}>
                {course.course.name}
              </Link>}
              actionIcon={
                <div className={classes.action}>
                  {course.completed ? (<CompletedIcon color="secondary" />)
                    : (<InProgressIcon className={classes.progress} />)}
                </div>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default Enrollments;