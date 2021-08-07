import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import React, { useState } from 'react';

import useStyles from './styles';

function ResponsiveDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    handleClose();
  };

  return (
    <div>
      <Avatar className={classes.deleteFlyButton} onClick={handleClickOpen}>
        <DeleteSweepIcon className={classes.deleteSweepIcon} />
      </Avatar>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {'Remover produto do catálogo?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa ação não pode ser desfeita!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color='primary'
            variant='contained'
          >
            Manter o produto
          </Button>
          <Button
            onClick={(e) => handleDelete(e)}
            color='secondary'
            variant='contained'
            autoFocus
          >
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ResponsiveDialog;
