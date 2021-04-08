import React, { useContext } from 'react';
import { Switch } from 'react-router-dom';
import AuthContext from '../Contexts/auth';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Categorias from '../Pages/Categorias';
import Produtos from '../Pages/Produtos/ListaProdutos';
import NovoProduto from '../Pages/Produtos/NovoProduto';
import Pedidos from '../Pages/Pedidos/ListaPedidos';
import Usuarios from '../Pages/Usuarios/ListaUsuarios';
import Ofertas from '../Pages/Ofertas/ListaOfertas';
import PedidoNovo from '../Pages/Pedidos/NovoPedido';
import NovaOferta from '../Pages/Ofertas/NovaOferta';
import EditarOferta from '../Pages/Ofertas/EditarOferta';
import EditarProduto from '../Pages/Produtos/EditarProduto';
import EditarPedido from '../Pages/Pedidos/EditarPedido';
import ListarAdministradores from '../Pages/Administradores/ListaAdministradores';
import NovoAdministrador from '../Pages/Administradores/NovoAdministrador';
import EditarAdministrador from '../Pages/Administradores/EditarAdministrador';
import Relatorios from '../Pages/Relatorios';
import Route from './route';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const index = () => {
  const { signed } = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact component={Login} isPrivate={false} signed={signed} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate signed={signed} />
      <Route path="/categorias" exact component={Categorias} isPrivate signed={signed} />
      <Route path="/produtos" exact component={Produtos} isPrivate signed={signed} />
      <Route path="/produtos/novo" exact component={NovoProduto} isPrivate signed={signed} />
      <Route path="/pedidos" exact component={Pedidos} isPrivate signed={signed} />
      <Route path="/usuarios" exact component={Usuarios} isPrivate signed={signed} />
      <Route path="/ofertas" exact component={Ofertas} isPrivate signed={signed} />
      <Route path="/ofertas/novo" exact component={NovaOferta} isPrivate signed={signed} />
      <Route path="/pedidos/novo" exact component={PedidoNovo} isPrivate signed={signed} />
      <Route path="/pedidos/editar" exact component={EditarPedido} isPrivate signed={signed} />
      <Route path="/ofertas/editar" exact component={EditarOferta} isPrivate signed={signed} />
      <Route path="/produtos/editar" exact component={EditarProduto} isPrivate signed={signed} />
      <Route path="/administradores" exact component={ListarAdministradores} isPrivate signed={signed} />
      <Route path="/administradores/novo" exact component={NovoAdministrador} isPrivate signed={signed} />
      <Route path="/administradores/editar" exact component={EditarAdministrador} isPrivate signed={signed} />
      <Route path="/relatorios" exact component={Relatorios} isPrivate signed={signed} />
    </Switch>
  );
};

export default index;
