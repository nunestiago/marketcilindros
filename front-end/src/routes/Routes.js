import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { SideBar } from '../components';
import { Home, Login, Register, StoreProducts } from '../pages';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <SideBar>
          <Route path='/store' component={StoreProducts} />
        </SideBar>
      </Switch>
    </Router>
  );
}

export default Routes;
