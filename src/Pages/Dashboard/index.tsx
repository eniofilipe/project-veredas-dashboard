import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Card, Titulo, Container, HeaderDashboard, CardInformacao, BodyDashboard } from './styles';

const index = () => {
  return (
    <Container>
      <HeaderDashboard>
        <Card>
          <Titulo>Pedidos Efetuados</Titulo>
        </Card>
        <Card>
          <Titulo>Produtos Disponíveis</Titulo>
        </Card>
        <Card>
          <Titulo>Usuários Ativos</Titulo>
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
          <Button>Usuários</Button> <p />
        </Card>
      </BodyDashboard>
    </Container>
  );
};

export default index;
