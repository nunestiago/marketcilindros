import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CancelIcon from '@material-ui/icons/Cancel';
import PersonIcon from '@material-ui/icons/Person';
import StorefrontIcon from '@material-ui/icons/Storefront';
import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './styles';

export default function IconTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex' }}>
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
            aria-label='perfil'
          />
          <Tab
            icon={<CancelIcon className={classes.svgIcon} />}
            aria-label='logout'
          />
        </Tabs>
      </div>
      {props.children}
    </div>
  );
}
