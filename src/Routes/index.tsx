import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';

const index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default index
