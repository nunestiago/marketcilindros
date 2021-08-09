import { Button, Divider, InputAdornment, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { CustomAlert, Loading } from '../../components';
import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

function AddProducts() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { user, token } = UseAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleNewItem(data) {
    setLoading(true);

    const formatedPrice = (data.price * 100).toFixed(0);
    console.log(data);
    try {
      const response = await fetch('http://localhost:3001/produtos', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          name: data.productName,
          price: formatedPrice,
          stock: data.stock,
          description: data.productDescription,
          image: 'http://loremflickr.com/240/230',
        }),
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
      // history.push('/produtos');

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />

      <Typography variant='h3' className={classes.title}>
        {user.nome_loja}
      </Typography>

      <Typography variant='h4' className={classes.subtitle}>
        Adicionar produto
      </Typography>

      <form onSubmit={handleSubmit(handleNewItem)} className={classes.forms}>
        <TextField
          id='storename'
          label='Nome do produto'
          type='text'
          className={classes.margin}
          {...register('productName', {
            required: "'Nome do produto' obrigatório ",
          })}
        />

        <div>
          <TextField
            {...register('price')}
            label='Preço'
            id='price'
            type='number'
            className={clsx(classes.margin)}
            InputProps={{
              inputProps: { min: 0, step: 0.01 },
              startAdornment: (
                <InputAdornment position='start'>R$</InputAdornment>
              ),
            }}
          />

          <TextField
            {...register('stock')}
            label='Estoque'
            id='stock'
            className={clsx(classes.margin)}
            type='number'
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <InputAdornment position='start'>Un</InputAdornment>
              ),
            }}
          />
        </div>
        <TextField
          id='productDescription'
          label='Descrição do produto'
          type='text'
          className={classes.margin}
          {...register('productDescription')}
        />

        <TextField
          id='productImage'
          label='Imagem'
          type='text'
          className={classes.margin}
          {...register('productImage')}
        />

        <div className={classes.footer}>
          <Divider className={classes.divider} />

          <CustomAlert errors={errors} />

          <Button color='primary' component={Link} to={'/produtos'}>
            CANCELAR
          </Button>

          <Button variant='contained' color='primary' type='submit'>
            Adicionar produto
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
