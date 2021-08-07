import { Button, Divider, InputAdornment, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CustomAlert, Loading } from '../../components';
import useStyles from './styles';

function AddProducts() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setLoading(true);

    try {
    } catch (error) {}
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />
      <Typography variant='h3' className={classes.title}>
        Nome da loja
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Adicionar produto
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id='storename'
          label='Nome da loja'
          type='text'
          className={classes.margin}
          {...register('storeName', {
            required: "'Nome da Loja' obrigatório ",
          })}
        />
        <div>
          <TextField
            label='Preço'
            id='standard-start-adornment'
            type='number'
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              inputProps: { min: '0.00', step: '0.01' },
              startAdornment: (
                <InputAdornment position='start'>R$</InputAdornment>
              ),
            }}
            {...register('price', {
              required: "'Preço' obrigatório ",
              valueAsNumber: 'Preço com números',
            })}
          />
          <TextField
            label='Estoque'
            id='standard-start-adornment'
            className={clsx(classes.margin, classes.textField)}
            type='number'
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <InputAdornment position='start'>Un</InputAdornment>
              ),
            }}
            {...register('storeName', {
              required: "'Estoque' obrigatório ",
              valueAsNumber: 'Estoque em números',
            })}
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
          <Button color='primary'>CANCELAR</Button>
          <Button variant='contained' color='primary' type='submit'>
            Adicionar produto
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
