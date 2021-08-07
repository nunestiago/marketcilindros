import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { CustomAlert, Loading } from '../../components';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { UseAuth } from '../../context/AuthContext';
import { emailRegex } from '../../utils/emailRegex';
import useStyles from './styles';

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { setUser, setToken, setCachedUser } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const dataApi = await response.json();

      if (response.ok) {
        setUser(dataApi.user);
        setToken(dataApi.token);
        history.push('/store');
        setLoading(false);
      }
      let err = new Error(dataApi);
      err.Status = 400;
      throw err;
    } catch (error) {
      setLoading(false);
      setApiError(error.message);
    }
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />

      <Paper className={classes.paper} elevation={10}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant='h4' gutterBottom={true}>
              Login
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
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

              <CustomAlert errors={errors} />
              {apiError && (
                <Alert severity='error' className={classes.alert}>
                  {apiError}
                </Alert>
              )}

              <Button type='submit' color='primary' variant='contained'>
                Entrar
              </Button>

              <Typography
                variant='caption'
                display='block'
                style={{ width: '100%' }}
              >
                Primeira vez aqui?
                <Link to={'/register'}>CRIE UMA CONTA</Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Login;
