import React from 'react';
import { Select } from '@material-ui/core';
import { Card, Container, HeaderDashboard } from './styles';

const index = () => {
  return (
    <Container>
      <HeaderDashboard>
        <Card>
          <p>Pedidos Efetuados</p>
          <p>20</p>
        </Card>
        <Card>
          <p>Produtos Disponíveis</p>
          <p>20</p>
        </Card>
        <Card>
          <p>Usuários Ativos</p>
          <p>20</p>
        </Card>
      </HeaderDashboard>
    </Container>
  );
};

export default index;
