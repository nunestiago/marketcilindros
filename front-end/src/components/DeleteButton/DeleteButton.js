import { Avatar } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import React from 'react';

import useStyles from './styles';

function ResponsiveDialog({ onClickOpen }) {
  const classes = useStyles();

  return (
    <Avatar className={classes.deleteFlyButton} onClick={onClickOpen}>
      <DeleteSweepIcon className={classes.deleteSweepIcon} />
    </Avatar>
  );
}

export default ResponsiveDialog;
