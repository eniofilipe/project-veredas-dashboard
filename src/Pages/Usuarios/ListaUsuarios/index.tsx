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
import { Container, SearchUsersContainer } from './styles';

const rows = [
  {
    id: '463',
    name: 'Deise Santana',
    email: 'usuario@email.com',
    phone: '38 99191-8888',
    adress: 'Av Rui de Albuquerque, 1052, bl13 ap403',
    delete: () => <Button>Excluir</Button>,
  },
  {
    id: '430',
    name: 'Deise Santana',
    email: 'usuario@email.com',
    phone: '38 99191-8888',
    adress: 'Av Rui de Albuquerque, 1052, bl13 ap403',
    delete: () => <Button>Excluir</Button>,
  },
];

const index = () => (
  <Container>
    <SearchUsersContainer>
      <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
    </SearchUsersContainer>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Endereço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.adress}</TableCell>
            </TableRow>
          ))}
          <TableRow />
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);

export default index;
