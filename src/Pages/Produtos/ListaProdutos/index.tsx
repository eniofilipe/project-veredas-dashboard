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
import { Container, AddProductContainer } from './styles';

const rows = [
  {
    id: '463',
    name: 'Alface',
    description: 'Pacote de 300g',
    category: ['Hortaliças', 'Verde'],
    delete: () => <Button>Excluir</Button>,
  },
  {
    id: '430',
    name: 'Cebola',
    description: 'Pacote de 500g',
    category: ['Hortaliças', 'Essencial'],
    delete: () => <Button>Excluir</Button>,
  },
];

const index = () => (
  <Container>
    <AddProductContainer>
      <Button>Novo Produto</Button>
      <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
    </AddProductContainer>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cód</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Categorias</TableCell>
            <TableCell>
              <Button>Excluir</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
              <TableCell>{item.id}</TableCell>

              <TableCell>{item.name}</TableCell>

              <TableCell>{item.description}</TableCell>

              <TableCell>{item.category.map((category) => `${category},`)}</TableCell>

              <TableCell>
                <Button>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow />
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);

export default index;
