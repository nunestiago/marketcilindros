import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    marginBottom: 40,
  },
}));

export default useStyles;
