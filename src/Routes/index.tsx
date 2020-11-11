import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Categorias from '../Pages/Categorias';

const index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/categorias" exact component={Categorias} />
      </Switch>
    </BrowserRouter>
  )
}

export default index
