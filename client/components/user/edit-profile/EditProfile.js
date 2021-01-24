import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import auth from '../../../utils/auth-helper';
import { read, update } from '../../../utils/api-user';
import { Redirect } from 'react-router-dom';

import { editProfileStyles } from './EditProfile.Styles';

const EditProfile = ({ match }) => {
  const classes = editProfileStyles();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    redirectToProfile: false,
    educator: false
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({
      userId: match.params.userId
    }, { t: jwt.token }, signal).then(data => {
      if (data && data.error) {
        setValues({
          ...values, error: data.error
        })
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          educator: data.educator
        })
      }
    });

    return function cleanup() {
      abortController.abort();
    }
  }, [match.params.userId])

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      educator: values.educator
    }

    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then(data => {
      if (data && data.error) {
        setValues({ ...values, error: data.error })
      } else {
        auth.updateUser(data, () => {
          setValues({
            ...values,
            userId: data._id,
            redirectToProfile: true
          })
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleCheck = (event, checked) => {
    setValues({
      ...values, educator: checked
    })
  }

  if (values.redirectToProfile) {
    return (
      <Redirect to={`/user/${values.userId}`}
      />
    )
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
          </Typography>
        <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
        <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
        <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" /> <br />
        <br />
        <Typography variant="subtitle1" className={classes.subheading}>
          I am an Educator
        </Typography>
        <FormControlLabel
          control={
            <Switch
              classes={{
                checked: classes.checked,
                bar: classes.bar
              }}
              checked={values.educator}
              onChange={handleCheck}
            />
          }
          label={values.educator ? 'Yes' : 'No'}
        />
        <br /> {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default EditProfile;