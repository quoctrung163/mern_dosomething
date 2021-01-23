import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import seashellImg from '../../../assets/images/seashell.jpg';
import { Link } from 'react-router-dom';
import { homeStyles } from './Home.Styles';

class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <Typography variant="h6" className={classes.title}>
          Home Page
          </Typography>
        <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
        <CardContent>
          <Typography variant="body2" component="p">
            Welcome to!
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(homeStyles)(Home);
