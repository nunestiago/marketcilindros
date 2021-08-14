import { ButtonGroup } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CustomCard } from '../../components';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/nunestiago'>
        Tiago Nunes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getStoreItems(store?.id);
  }, [store]);

  async function getData() {
    try {
      const response = await fetch('https://stark-coast-12913.herokuapp.com/lojas');
      const data = await response.json();

      setStores(data);
    } catch (error) {}
  }

  async function getStoreItems(id) {
    if (!id) return setProducts([]);
    try {
      const response = await fetch(`https://stark-coast-12913.herokuapp.com/lojas/${id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {}
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckBoxOutlineBlankIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
          gutterBottom={true}
          style={{ marginBottom: 30 }}
        >
          Mini lojas da Cubos
        </Typography>
        <form className={classes.form} noValidate>
          <Autocomplete
            id='seleção de lojas'
            options={stores}
            getOptionLabel={(option) => option.nome_loja}
            style={{ width: 300, marginBottom: 30 }}
            renderInput={(params) => (
              <TextField {...params} label='Lojas' variant='outlined' />
            )}
            onChange={(_, value) => setStore(value)}
          />
          <div>
            <ButtonGroup>
              <Button
                variant='contained'
                color='secondary'
                style={{ marginBottom: 30 }}
                onClick={() => history.push('/login')}
              >
                Login
              </Button>

              <Button
                variant='contained'
                color='primary'
                style={{ marginBottom: 30 }}
                onClick={() => history.push('/cadastro')}
              >
                Cadastro
              </Button>
            </ButtonGroup>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100vw',
              justifyContent: 'center',
            }}
          >
            {products && products.map((item) => <CustomCard item={item} />)}
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant='body2' color='textSecondary' align='center'>
          Todas as lojas são meramente demonstrativas, o site não possui sistema
          de pagamentos.
        </Typography>
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
