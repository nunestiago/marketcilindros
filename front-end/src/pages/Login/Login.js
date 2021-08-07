import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Loading } from '../../components';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { emailRegex } from '../../utils/emailRegex';
import useStyles from './styles';

function Login() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    setLoading(true);
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />
      <Paper className={classes.paper} elevation={10}>
        <Grid container spacing={2}>
          <Typography variant='h4' gutterBottom={true}>
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
            {' '}
            <TextField
              label='E-mail'
              fullWidth
              autoFocus
              type='email'
              error={!!errors.email}
              {...register('email', {
                required: 'E-mail obrigatório',
                pattern: {
                  value: emailRegex,
                  message: 'E-mail inválido',
                },
              })}
            />
            <PasswordInput
              label={'Senha'}
              error={!!errors.password}
              register={() =>
                register('password', { required: 'Senha obrigatório' })
              }
            />
            <Button type='submit' color='primary' variant='contained'>
              Entrar
            </Button>
            <Typography
              variant='caption'
              display='block'
              style={{ width: '100%' }}
            >
              Primeira vez aqui? <Link to={'/register'}>CRIE UMA CONTA</Link>
            </Typography>
          </form>
        </Grid>
      </Paper>
    </div>
  );
}

export default Login;
