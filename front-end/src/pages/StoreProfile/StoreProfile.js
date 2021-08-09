import { Button, Divider, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

function StoreProfile() {
  const classes = useStyles();
  const { user } = UseAuth();
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    console.log(errors);
  }

  return (
    <div className={classes.root}>
      <Typography variant='h3' className={classes.title}>
        {user.nome_loja}
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Perfil
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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

          <Button variant='contained' color='primary' type='submit'>
            Editar perfil
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StoreProfile;
