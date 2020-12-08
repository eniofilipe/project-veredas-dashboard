import React from 'react';
import { Button } from '@material-ui/core';
import { Card, Titulo, Container, HeaderDashboard, CardInformacao, CardRelatorio, BodyDashboard } from './styles';

const index = () => {
  return (
    <Container>
      <HeaderDashboard>
        <Card>
          <Titulo>Pedidos Efetuados</Titulo>
          <p>20</p>
        </Card>
        <Card>
          <Titulo>Produtos Disponíveis</Titulo>
          <p>20</p>
        </Card>
        <Card>
          <Titulo>Usuários Ativos</Titulo>
          <p>20</p>
        </Card>
      </HeaderDashboard>
      <BodyDashboard>
        <CardInformacao>Informações</CardInformacao>
        <CardRelatorio>
          <Titulo>Relatórios</Titulo>
          <Button>Produtos</Button>
          <Button>Pedidos</Button>
          <Button>Usuários</Button>
        </CardRelatorio>
      </BodyDashboard>
    </Container>
  );
};

export default index;
