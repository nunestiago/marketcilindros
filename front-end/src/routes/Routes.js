import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { SideBar } from '../components';
import { UseAuth } from '../context/AuthContext';
import { AddProduct, Home, Login, Register, StoreProducts } from '../pages';

function ProtectedRoutes({ children }) {
  const { token } = UseAuth();
  return <Route render={() => (token ? children : <Redirect to='/' />)} />;
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <ProtectedRoutes>
          <SideBar>
            <Route path='/store' component={StoreProducts} />
            <Route path='/addproduct' component={AddProduct} />
          </SideBar>
        </ProtectedRoutes>
      </Switch>
    </Router>
  );
}

export default Routes;
