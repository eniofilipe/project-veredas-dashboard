/* eslint-disable react/display-name */
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
import { AddCategoryContainer } from './styles';

const rows = [
  {
    id: '#1',
    category: 'Hortaliças',
    delete: () => <Button>Excluir</Button>,
  },
  {
    id: '#2',
    category: 'Veganos',
    delete: () => <Button>Excluir</Button>,
  },
];

const index = () => (
  <div style={{ width: '100%' }}>
    <AddCategoryContainer>
      <span>Categoria: </span>
      <TextField id="outlined-basic" variant="outlined" />
      <Button>Adicionar</Button>
    </AddCategoryContainer>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cód</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>
              <Button>Excluir</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
              <TableCell>{item.id}</TableCell>

              <TableCell>{item.category}</TableCell>

              <TableCell>
                <Button>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow />
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default index;
