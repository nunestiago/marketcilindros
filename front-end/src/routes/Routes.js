import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { SideBar } from '../components';
import { UseAuth } from '../context/AuthContext';
import { AddProduct, EditProduct, EditProfile, Login, Register, StoreProducts, StoreProfile } from '../pages';

function ProtectedRoutes({ children }) {
  const { token } = UseAuth();
  return <Route render={() => (token ? children : <Redirect to='/' />)} />;
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/cadastro' component={Register} />
        <ProtectedRoutes>
          <SideBar>
            <Route path='/produtos' exact component={StoreProducts} />
            <Route path='/produtos/novo' component={AddProduct} />
            <Route path='/produtos/:id/editar' component={EditProduct} />
            <Route path='/perfil/editar' component={EditProfile} />
            <Route path='/perfil/' exact component={StoreProfile} />
          </SideBar>
        </ProtectedRoutes>
      </Switch>
    </Router>
  );
}

export default Routes;
