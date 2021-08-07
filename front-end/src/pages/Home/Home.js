import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

import useStyles from './styles';

function Home() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <ButtonGroup
          variant='contained'
          color='primary'
          aria-label='contained primary button group'
        >
          <Button onClick={() => history.push('/store')}>Lojas</Button>
          <Button onClick={() => history.push('/login')}>Login</Button>
          <Button onClick={() => history.push('/register')}>Registrar</Button>
        </ButtonGroup>
      </Router>
    </div>
  );
}

export default Home;
