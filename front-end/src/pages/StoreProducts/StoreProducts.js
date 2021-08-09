import { Button, Divider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { DeleteDialog } from '../../components';
import CustomCard from '../../components/CustomCard/CustomCard';
import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

function StoreProducts() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [currentId, setCurrentId] = useState('');

  const { user, token } = UseAuth();

  useEffect(() => {
    getData();
  }, [token]);

  async function getData() {
    try {
      const response = await fetch('http://localhost:3001/produtos', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClickOpen = (e, item) => {
    e.stopPropagation();
    e.cancelBubble = true;
    setCurrentId(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/produtos');
  };

  return (
    <div className={classes.root}>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        id={currentId}
        getData={getData}
      />
      <Typography variant='h3' className={classes.title}>
        {user.nome_loja}
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Seus produtos
      </Typography>

      <div style={{ display: 'flex', marginRight: '10px' }}>
        {products &&
          products.map((item) => (
            <CustomCard
              onClickOpen={(e) => handleClickOpen(e, item.id)}
              item={item}
              key={item.id}
            />
          ))}
      </div>

      <Divider className={classes.divider} />
      <Button
        variant='contained'
        color='primary'
        component={Link}
        to={'/produtos/novo'}
      >
        Adicionar produto
      </Button>
    </div>
  );
}

export default StoreProducts;
