import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { CustomAlert, PasswordInput } from '../../components';
import Loading from '../../components/Loading/Loading';
import useStyles from './styles';

function Register() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  async function handleRegistration(data) {
    setLoading(true);

    try {
      const response = await fetch(
        'https://stark-coast-12913.herokuapp.com/cadastro',
        {
          method: 'POST',
          body: JSON.stringify({
            nome: data.username,
            nome_loja: data.storename,
            email: data.email,
            senha: data.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const dataAPI = await response.json();
      if (!response.ok) {
        let err = new Error(dataAPI);
        err.Status = 400;
        throw err;
      }
      setLoading(false);
      history.push('/login');
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />
      <Paper className={classes.paper} elevation={10}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant='h4' gutterBottom={true}>
              Criar uma conta
            </Typography>
            <form
              className={classes.form}
              onSubmit={handleSubmit(handleRegistration)}
            >
              <TextField
                id='username'
                label='Seu nome'
                type='text'
                fullWidth
                {...register('username', {
                  required: "Campo 'Usuário' obrigatório ",
                })}
                error={!!errors.username}
              />
              <TextField
                id='storename'
                label='Nome da loja'
                type='text'
                fullWidth
                error={!!errors.storename}
                {...register('storename', {
                  required: "Campo 'Nome da Loja' obrigatório ",
                })}
              />
              <TextField
                id='email'
                label='E-mail'
                type='email'
                fullWidth
                error={!!errors.email}
                {...register('email', {
                  required: "Campo 'E-mail' obrigatório ",
                })}
              />
              <PasswordInput
                label='Senha'
                register={() =>
                  register('password', {
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
                        const { password } = getValues();
                        return password === value || 'Senha não confere!';
                      },
                    },
                  })
                }
              />
              {apiError && (
                <Alert severity='error' className={classes.alert}>
                  {apiError}
                </Alert>
              )}
              <CustomAlert errors={errors} />

              <Button type='submit' color='primary' variant='contained'>
                CRIAR CONTA
              </Button>
              <Typography variant='caption' display='block'>
                Já possui uma conta? <Link to={'/login'}> ACESSE</Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Register;
