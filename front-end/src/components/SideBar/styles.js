import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 140,
  },
  tabs: {
    minHeight: '100%',
    maxWidth: 140,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: '0 0 40px 0',
    backgroundColor: theme.palette.background.barBackground,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 110,
    color: theme.palette.text.secondary,
  },
  tab: {
    boxSizing: 'content-box',
  },
  active_tab: { color: 'red' },
  svgIcon: { boxSizing: 'content-box', fontSize: 32, padding: 10 },
}));

export default useStyles;
