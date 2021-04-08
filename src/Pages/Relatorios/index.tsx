import { Button, Paper } from '@material-ui/core';
import React from 'react';
import gerarRelatoriosPedidos from './RelatorioPedidos';
import gerarRelatoriosProdutos from './RelatorioProdutos';

const Relatorios = () => {
  return (
    <Paper>
      <Button onClick={() => gerarRelatoriosPedidos()}>Gerar Relatório Pedidos</Button>
      <Button onClick={() => gerarRelatoriosProdutos()}>Gerar Relatório Produtos</Button>
    </Paper>
  );
};

export default Relatorios;
