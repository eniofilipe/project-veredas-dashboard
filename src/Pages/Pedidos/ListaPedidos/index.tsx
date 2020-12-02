import React from 'react';
import {
  Button,
  ButtonGroup,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Table,
  Paper,
  TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Container, SearchOrderContainer } from './styles';

const rows = [
  {
    id: '463',
    name: 'Alface',
    status: 'Pacote de 300g',
    total: 10,
    data: '10/10/2020',
    delete: () => <Button>Excluir</Button>,
  },
  {
    id: '430',
    name: 'Cebola',
    status: 'Pacote de 500g',
    total: 10,
    data: '10/10/2020',
    delete: () => <Button>Excluir</Button>,
  },
];

const options = ['Dinheiro', 'Cartão de Débito'];

const index = () => (
  <Container>
    <SearchOrderContainer>
      <Button component={Link} to="/pedidos/novo">
        Novo Pedido
      </Button>
      <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
    </SearchOrderContainer>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cód</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Data</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total)}
              </TableCell>
              <TableCell>{item.data}</TableCell>
              <TableCell>{item.delete()}</TableCell>
            </TableRow>
          ))}
          <TableRow />
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);

export default index;
