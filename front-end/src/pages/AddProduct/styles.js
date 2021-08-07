import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 60,
    marginTop: 78,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 86,
  },
  subtitle: {
    marginBottom: 57,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  margin: {
    marginBottom: 48,
    marginRight: 24,
  },
  divider: {
    margin: '1rem 0',
  },
  footer: {
    marginTop: 'auto',
  },
}));

export default useStyles;
