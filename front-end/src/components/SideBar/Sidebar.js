import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CancelIcon from '@material-ui/icons/Cancel';
import PersonIcon from '@material-ui/icons/Person';
import StorefrontIcon from '@material-ui/icons/Storefront';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UseAuth } from '../../context/AuthContext';
import useStyles from './styles';

export default function IconTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { setUser, setToken } = UseAuth();
  const history = useHistory();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  function logout() {
    setUser({});
    setToken('');
    history.push('/');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className={classes.root}>
        <Tabs
          orientation='vertical'
          value={value}
          onChange={handleChange}
          centered={true}
          className={classes.tabs}
          aria-label='icon tabs example'
          classes={{ indicator: classes.indicator }}
        >
          <Tab
            selected={true}
            icon={<StorefrontIcon className={classes.svgIcon} />}
            aria-label='loja'
            component={Link}
            to={'/produtos'}
          />
          <Tab
            icon={<PersonIcon className={classes.svgIcon} />}
            component={Link}
            to={'/perfil'}
            aria-label='perfil'
          />
          <Tab
            icon={<CancelIcon className={classes.svgIcon} />}
            aria-label='logout'
            onClick={logout}
          />
        </Tabs>
      </div>
      {props.children}
    </div>
  );
}
