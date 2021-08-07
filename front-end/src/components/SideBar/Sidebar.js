import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CancelIcon from '@material-ui/icons/Cancel';
import PersonIcon from '@material-ui/icons/Person';
import StorefrontIcon from '@material-ui/icons/Storefront';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 140,
  },
  tabs: {
    height: '100vh',
    maxWidth: 140,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: '0 0 40px 0',
    backgroundColor: theme.palette.background.barBackground,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 110,
    color: theme.palette.text.secondary,
  },
  tab: {
    boxSizing: 'content-box',
  },
  svgIcon: { boxSizing: 'content-box', fontSize: 32, padding: 10 },
}));

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
            icon={<StorefrontIcon className={classes.svgIcon} />}
            aria-label='phone'
          />
          <Tab
            icon={<PersonIcon className={classes.svgIcon} />}
            aria-label='favorite'
          />
          <Tab
            icon={<CancelIcon className={classes.svgIcon} />}
            aria-label='person'
          />
        </Tabs>
      </div>
      {props.children}
    </div>
  );
}
