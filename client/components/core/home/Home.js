import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import seashellImg from '../../../assets/images/seashell.jpg';

import { homeStyles } from './Home.Styles';

const Home = () => {
  const classes = homeStyles();
  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Home Page
          </Typography>
      <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells" />
      <CardContent>
        <Typography variant="body2" component="p">
          Snack Hub
          </Typography>
      </CardContent>
    </Card>
  );
}

export default Home;