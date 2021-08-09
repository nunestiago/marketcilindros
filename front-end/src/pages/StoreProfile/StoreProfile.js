import { Button, Divider, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

import useStyles from './styles';

function StoreProfile() {
  const classes = useStyles();

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
        Nome da loja
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Perfil
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id='storename'
          label='Seu nome'
          type='text'
          fullwidth
          className={classes.margin}
          {...register('username', {
            required: "'Nome da Loja' obrigatório ",
          })}
        />

        <TextField
          id='productDescription'
          label='Nome da loja'
          type='text'
          fullwidth
          className={classes.margin}
          {...register('productDescription')}
        />
        <TextField
          id='productDescription'
          label='E-mail'
          type='email'
          fullwidth
          className={classes.margin}
          {...register('productDescription')}
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
