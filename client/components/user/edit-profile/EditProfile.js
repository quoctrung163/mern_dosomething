import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import auth from './../../../utils/auth-helper';
import { read, update } from './../../../utils/api-user';
import { Redirect } from 'react-router-dom';

import { editProfileStyles } from './EditProfile.Styles';

class EditProfile extends Component {
  constructor({ match }) {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      redirectToProfile: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated();
    read({
      userId: this.match.params.userId
    }, { t: jwt.token }).then(data => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ name: data.name, email: data.email })
      }
    })
  }

  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }

    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, user).then(data => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ 'userId': data._id, 'redirectToProfile': true })
      }
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirectToProfile) {
      return (
        <Redirect to={`/user/${this.state.userId}`} />
      )
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal" /><br />
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal" /><br />
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal" />
          <br />
          {
            this.state.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>Error</Icon>
                {this.state.error}
              </Typography>
            )
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(editProfileStyles)(EditProfile);