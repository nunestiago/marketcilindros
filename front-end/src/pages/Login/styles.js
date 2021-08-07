const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    maxHeight: 850,
    margin: `160px auto`,
    padding: 75,
    textAlign: 'center',
    borderRadius: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    '& > *': {
      margin: 20,
    },
  },
  alert: {
    width: '100%',
  },
}));

export default useStyles;
