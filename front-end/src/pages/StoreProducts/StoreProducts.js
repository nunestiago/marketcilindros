import { Button, Divider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CustomCard from '../../components/CustomCard/CustomCard';
import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

function StoreProducts() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const { user, token } = UseAuth();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://localhost:3001/store', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const data = await response.json();
        if (data.length === 0) {
          setIsEmpty(true);
        }
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, [user]);

  return (
    <div className={classes.root}>
      <Typography variant='h3' className={classes.title}>
        {user.nome_loja}
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Seus produtos
      </Typography>

      <div style={{ display: 'flex', marginRight: '10px' }}>
        <CustomCard />
        {products &&
          products.forEach((item) => <CustomCard item={item} key={item.id} />)}
      </div>

      <Divider className={classes.divider} />
      <Button
        variant='contained'
        color='primary'
        component={Link}
        to={'/addproduct'}
      >
        Adicionar produto
      </Button>
    </div>
  );
}

export default StoreProducts;
