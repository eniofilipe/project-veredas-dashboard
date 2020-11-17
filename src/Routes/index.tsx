import React from 'react'
import { Switch} from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Categorias from '../Pages/Categorias';
import Produtos from '../Pages/Produtos/ListaProdutos';

import Route from './route';

const index = () => {
  return (
    
      <Switch>
        <Route path="/" exact component={Login} isPrivate={false} signed />
        <Route path="/dashboard" exact component={Dashboard} isPrivate={true} signed />
        <Route path="/categorias" exact component={Categorias} isPrivate={true} signed/>
        <Route path="/produtos" exact component={Produtos} isPrivate={true} signed/>
      </Switch>
    
  )
}

export default index
