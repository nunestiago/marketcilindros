import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { DeleteButton } from '..';
import useStyles from './styles';

function CustomCard({ item, onClickOpen }) {
  const classes = useStyles();
  const history = useHistory();

  function handleItem(e) {
    e.stopPropagation();
    e.cancelBubble = true;
    history.push(`/produtos/${item.id}/editar`);
  }

  return (
    <Card className={classes.root} id={item?.id ?? 1}>
      <CardActionArea onClick={handleItem}>
        <DeleteButton onClickOpen={onClickOpen} />
        <CardMedia
          component='img'
          alt={item?.nome ?? 'Imagem do produto'}
          height='240'
          width='230'
          image={item?.imagem ?? 'http://loremflickr.com/240/230'}
          title={item?.nome ?? 'Cadastre primeiro produto'}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='h2'
            className={classes.cardTitle}
          >
            {item?.nome ?? 'Registre algo'}
          </Typography>

          <Typography variant='caption' color='textPrimary' component='p'>
            {item?.descricao ?? 'Descrição do produto'}
          </Typography>

          <div className={classes.cardBottom}>
            <Typography
              variant='overline'
              color='rgba(101, 101, 101, 0.855)'
              component='p'
            >
              {item?.estoque ?? 0} unidades
            </Typography>
            <Typography variant='body2' color='textPrimary' component='p'>
              R$ {(item?.preco / 100).toFixed(2) ?? 99.99}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default CustomCard;
