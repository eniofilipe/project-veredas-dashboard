import React from 'react'
import {BrowserRouter, Switch} from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Categorias from '../Pages/Categorias';

import Route from './route';

const index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} isPrivate={false} signed />
        <Route path="/dashboard" exact component={Dashboard} isPrivate={true} signed />
        <Route path="/categorias" exact component={Categorias} isPrivate={true} signed/>
      </Switch>
    </BrowserRouter>
  )
}

export default index
