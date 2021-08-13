import { Button, Divider, InputAdornment, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Image from 'material-ui-image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Loading } from '../../components';
import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

function EditProduct(props) {
  const classes = useStyles();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const { user, token } = UseAuth();
  const [loading, setLoading] = useState(false);

  const { id } = props.match.params;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await fetch(`https://stark-coast-12913.herokuapp.com/produtos/${id}`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const data = await response.json();
        setLoading(false);
        return setProduct(data);
      } catch (error) {
        setLoading(false);
      }
    }
    getData();
  }, []);

  async function handleEditProduct(data) {
    setLoading(true);

    const onlyUpdatedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value)
    );

    if (onlyUpdatedData.preco) {
      onlyUpdatedData.preco *= 100;
    }

    try {
      const response = await fetch(`https://stark-coast-12913.herokuapp.com/produto/${id}`, {
        method: 'PUT',
        body: JSON.stringify(onlyUpdatedData),
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
      }

      setLoading(false);

      return history.push('/produtos');
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />

      <form onSubmit={handleSubmit(handleEditProduct)}>
        <Typography variant='h3' className={classes.title}>
          {user.nome_loja}
        </Typography>

        <Typography variant='h4' className={classes.subtitle}>
          Editar produto
        </Typography>

        <div className={classes.toFlex}>
          <div className={classes.form}>
            <TextField
              id='storename'
              label='Nome do produto'
              helperText={product.nome}
              type='text'
              className={classes.margin}
              {...register('nome')}
            />
            <div>
              <TextField
                label='Preço'
                id='standard-start-adornment'
                type='number'
                helperText={product.preco}
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                  inputProps: { min: '0.00', step: '0.01' },
                  startAdornment: (
                    <InputAdornment position='start'>R$</InputAdornment>
                  ),
                }}
                {...register('preco')}
              />

              <TextField
                label='Estoque'
                id='standard-start-adornment'
                helperText={product.estoque}
                className={clsx(classes.margin, classes.textField)}
                type='number'
                InputProps={{
                  inputProps: { min: 0 },
                  startAdornment: (
                    <InputAdornment position='start'>Un</InputAdornment>
                  ),
                }}
                {...register('estoque')}
              />
            </div>
            <TextField
              id='productDescription'
              label='Descrição do produto'
              helperText={product.descricao}
              type='text'
              className={classes.margin}
              {...register('descricao')}
            />
            <TextField
              id='productImage'
              label='Imagem'
              helperText={product.imagem}
              type='text'
              className={classes.margin}
              {...register('imagem')}
            />{' '}
          </div>

          <div className={classes.image}>
            <Image
              src={product.imagem}
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
            Editar produto
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
