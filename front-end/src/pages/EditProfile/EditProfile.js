import { Button, Divider, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { CustomAlert, Loading } from '../../components';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

function EditProfile() {
  const classes = useStyles();
  const { token, setUser } = UseAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setLoading(true);
    setError('');

    const onlyUpdatedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value)
    );

    try {
      const response = await fetch(
        `https://stark-coast-12913.herokuapp.com/perfil`,
        {
          method: 'PUT',
          body: JSON.stringify(onlyUpdatedData),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        setUser(data);
        return history.push('/produtos');
      }
      setError(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <Loading loading={loading} />
      <Typography variant='h3' className={classes.title}>
        Nome da loja
      </Typography>

      <Typography variant='h4' className={classes.subtitle}>
        Editar perfil
      </Typography>

      <div className={classes.form}>
        <TextField
          id='storename'
          label='Seu nome'
          type='text'
          fullwidth
          className={classes.margin}
          {...register('nome')}
        />

        <TextField
          id='productDescription'
          label='Nome da loja'
          type='text'
          fullwidth
          className={classes.margin}
          {...register('nome_loja')}
        />

        <TextField
          id='productDescription'
          label='E-mail'
          type='email'
          fullwidth
          className={classes.margin}
          {...register('email')}
        />

        <PasswordInput
          label='Senha'
          register={() =>
            register('senha', {
              required: "Campo 'Senha' obrigatório ",
            })
          }
          error={!!errors.password}
        />
        <PasswordInput
          label='Repita a senha'
          error={!!errors.passwordConfirmation}
          register={() =>
            register('passwordConfirmation', {
              required: 'Confirme a senha!',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { senha } = getValues();
                  return senha === value || 'Senha não confere!';
                },
              },
            })
          }
        />

        <div className={classes.footer}>
          <Divider className={classes.divider} />
          {error && <Alert severity='error'>{error}</Alert>}
          <CustomAlert errors={errors} />
          <Button
            variant='outlined'
            color='primary'
            component={Link}
            to={'/perfil'}
          >
            Cancelar
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            Editar perfil
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
