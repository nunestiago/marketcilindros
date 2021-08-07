import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { width: 380 },
  deleteFlyButton: {
    position: 'absolute',
    top: 22,
    left: 22,
    width: 48,
    height: 48,
    background: theme.palette.secondary.main,
    cursor: 'pointer',
  },

  deleteSweepIcon: {
    color: 'rgba(0, 0, 0, 0.7)',
    width: 24,
    height: 24,
  },
}));

export default useStyles;
