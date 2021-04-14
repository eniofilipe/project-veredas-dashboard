import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Card, Titulo, Container, HeaderDashboard, CardInformacao, BodyDashboard } from './styles';

import { Pedido, Produto, ResponseProduto, Cliente } from '../../Types';
import { getPedidos } from '../../Api/Pedido';
import { getProduto } from '../../Api/Produtos';
import { getClientes } from '../../Api/Clientes';

const index = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<ResponseProduto>();
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const counts = async () => {
    try {
      const responsepedidos = await getPedidos();
      setPedidos(responsepedidos.data);

      const responseprodutos = await getProduto();
      setProdutos(responseprodutos.data);

      const responseclientes = await getClientes();
      setClientes(responseclientes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    counts();
  }, []);

  return (
    <Container>
      <HeaderDashboard>
        <Card>
          <Titulo>Pedidos Efetuados</Titulo>
          <Titulo>{pedidos.length}</Titulo>
        </Card>
        <Card>
          <Titulo>Produtos Disponíveis</Titulo>
          <Titulo>{produtos?.produtos.length}</Titulo>
        </Card>
        <Card>
          <Titulo>Clientes</Titulo>
          <Titulo>{clientes.length}</Titulo>
        </Card>
      </HeaderDashboard>
      <BodyDashboard>
        <CardInformacao>
          <Titulo>Informações</Titulo>
        </CardInformacao>
        <Card>
          <Titulo>Relatórios</Titulo>
          <Button>Produtos</Button> <p />
          <Button>Pedidos</Button> <p />
        </Card>
      </BodyDashboard>
    </Container>
  );
};

export default index;
