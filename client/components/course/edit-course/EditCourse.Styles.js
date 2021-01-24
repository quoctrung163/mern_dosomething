import { makeStyles } from '@material-ui/core/styles';

export const editCourseStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(12)
  }),
  flex: {
    display: 'flex',
    marginBottom: 20
  },
  card: {
    padding: '24px 40px 40px'
  },
  subheading: {
    margin: '10px',
    color: theme.palette.openTitle
  },
  details: {
    margin: '16px',
  },
  upArrow: {
    border: '2px solid #f57c00',
    marginLeft: 3,
    marginTop: 10,
    padding: 4
  },
  sub: {
    display: 'block',
    margin: '3px 0px 5px 0px',
    fontSize: '0.9em'
  },
  media: {
    height: 250,
    display: 'inline-block',
    width: '50%',
    marginLeft: '16px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  textfield: {
    width: 350
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }, input: {
    display: 'none'
  },
  filename: {
    marginLeft: '10px'
  },
  list: {
    backgroundColor: '#f3f3f3'
  }
}));