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
    formState: { errors },
  } = useForm();

  async function handleNewItem(data) {
    setLoading(true);
    console.log(data);
    const formatedPrice = (data.price * 100).toFixed(0);

    try {
      const response = await fetch(
        'https://stark-coast-12913.herokuapp.com/produtos',
        {
          method: 'POST',
          body: JSON.stringify({
            id: user.id,
            nome: data.productName,
            preco: formatedPrice,
            estoque: data.stock,
            descricao: data.productDescription,
            imagem: data.productImage,
          }),
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
        }
      );

      const dataAPI = await response.json();
      if (!response.ok) {
        let err = new Error(dataAPI);
        err.Status = 400;
        throw err;
      }

      history.push('/produtos');
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
            required: "'Nome do produto' obrigat??rio ",
          })}
        />

        <div>
          <TextField
            {...register('price')}
            label='Pre??o'
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
          label='Descri????o do produto'
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
