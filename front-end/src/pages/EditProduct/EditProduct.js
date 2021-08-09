import { Button, Divider, InputAdornment, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Image from 'material-ui-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

function EditProduct(props) {
  const classes = useStyles();
  const history = useHistory();
  console.log(props.match.params);
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
        Nome do produto
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Editar produto
      </Typography>
      <div className={classes.toFlex}>
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
        </form>
        <div className={classes.image}>
          <Image
            src='http://loremflickr.com/300/400'
            style={{
              width: '300px',
              height: '400px',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          />
        </div>
      </div>
      <div className={classes.footer}>
        <Divider className={classes.divider} />
        <Button color='primary' onClick={() => history.push('/produtos')}>
          CANCELAR
        </Button>
        <Button variant='contained' color='primary' type='submit'>
          Adicionar produto
        </Button>
      </div>
    </div>
  );
}

export default EditProduct;
