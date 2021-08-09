import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 60,
    marginTop: 78,
    display: 'flex',
    flexDirection: 'column',
  },
  toFlex: { display: 'flex' },
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
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(10),
    borderRadius: '16px',
  },
  footer: {
    marginTop: 'auto',
  },
}));

export default useStyles;
