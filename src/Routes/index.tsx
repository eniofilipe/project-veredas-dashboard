import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Categorias from '../Pages/Categorias';
import Produtos from '../Pages/Produtos/ListaProdutos';
import Pedidos from '../Pages/Pedidos/ListaPedidos';
import Usuarios from '../Pages/Usuarios/ListaUsuarios';
import Ofertas from '../Pages/Ofertas/ListaOfertas';

import Route from './route';

const index = () => (
  <Switch>
    <Route path="/" exact component={Login} isPrivate={false} signed />
    <Route path="/dashboard" exact component={Dashboard} isPrivate signed />
    <Route path="/categorias" exact component={Categorias} isPrivate signed />
    <Route path="/produtos" exact component={Produtos} isPrivate signed />
    <Route path="/pedidos" exact component={Pedidos} isPrivate signed />
    <Route path="/usuarios" exact component={Usuarios} isPrivate signed />
    <Route path="/ofertas" exact component={Ofertas} isPrivate signed />
  </Switch>
);

export default index;
