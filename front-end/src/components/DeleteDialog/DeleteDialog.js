import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { UseAuth } from '../../context/AuthContext';

function ResponsiveDialog({ id, onClose, open, getData }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { token } = UseAuth();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://stark-coast-12913.herokuapp.com/produto/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      });
      const dataAPI = await response.json();
      if (!response.ok) {
        let err = new Error(dataAPI);
        err.Status = 400;
        throw err;
      }
      history.push('/produtos');
    } catch (error) {
    } finally {
      getData();
    }

    onClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>
        {'Remover produto do catálogo?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Essa ação não pode ser desfeita!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color='primary' variant='contained'>
          Manter o produto
        </Button>
        <Button
          onClick={handleDelete}
          color='secondary'
          variant='contained'
          autoFocus
        >
          Remover
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ResponsiveDialog;
