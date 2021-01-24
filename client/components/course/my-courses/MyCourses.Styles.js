import { makeStyles } from '@material-ui/core/styles';

export const myCoursesStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(12)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  addButton: {
    float: 'right'
  },
  leftIcon: {
    marginRight: "8px"
  },
  avatar: {
    borderRadius: 0,
    width: 65,
    height: 40
  },
  listText: {
    marginLeft: 16
  }
}));