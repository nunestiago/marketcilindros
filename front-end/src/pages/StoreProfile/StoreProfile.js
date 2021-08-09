import { Button, Divider, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

function StoreProfile() {
  const classes = useStyles();
  const { user } = UseAuth();

  return (
    <div className={classes.root}>
      <Typography variant='h3' className={classes.title}>
        {user.nome_loja}
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Perfil
      </Typography>
      <form className={classes.form}>
        <TextField
          id='storename'
          label='Seu nome'
          type='text'
          value={user.nome_loja}
          fullwidth
          className={classes.margin}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id='productDescription'
          label='Nome da loja'
          type='text'
          value={user.nome}
          fullwidth
          className={classes.margin}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='productDescription'
          label='E-mail'
          type='email'
          value={user.email}
          fullwidth
          className={classes.margin}
          InputLabelProps={{ shrink: true }}
        />

        <div className={classes.footer}>
          <Divider className={classes.divider} />

          <Button
            variant='contained'
            color='primary'
            type='submit'
            component={Link}
            to={'/perfil/editar'}
          >
            Editar perfil
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StoreProfile;
