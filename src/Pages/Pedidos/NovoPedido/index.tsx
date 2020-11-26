import React from 'react';
import {
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Table,
  Paper,
  TextField,
} from '@material-ui/core';
import { Container, AddOrderContainer } from './styles';

const rows = [
  {
    quantity: '4',
    id: '463',
    name: 'Alface',
    status: 'Pacote de 300g',
    category: 'Hortaliças',
    price: 19,
    delete: () => <Button>Excluir</Button>,
  },
  {
    quantity: '1',
    id: '430',
    name: 'Cebola',
    status: 'Pacote de 500g',
    category: 'Hortaliças',
    price: 10,
    delete: () => <Button>Excluir</Button>,
  },
];

const index = () => (
  <Container>
    <AddOrderContainer>
      <span>Cliente:</span>
      <TextField disabled id="outlined-basic" variant="outlined" />
      <Button>Adicionar Cliente</Button>
      <Button>Adicionar Produto</Button>
    </AddOrderContainer>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quantidade</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Categorias</TableCell>
            <TableCell>Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
              </TableCell>
              <TableCell>{item.delete()}</TableCell>
            </TableRow>
          ))}
          <TableRow />
        </TableBody>
      </Table>
    </TableContainer>
    <Button>Voltar</Button>
    <Button>Salvar</Button>
  </Container>
);

export default index;
