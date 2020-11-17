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
import { Container, AddOfferContainer } from './styles';

const rows = [
  {
    id: '463',
    status: 'Aberta',
    validade: '10/10/2020',
    delete: () => <Button>Excluir</Button>,
    editar: () => <Button>Editar</Button>,
    copiar: () => <Button>Nova</Button>,
  },
  {
    id: '430',
    status: 'Finalizada',
    validade: '10/10/2020',
    delete: () => <Button>Excluir</Button>,
    editar: () => <Button>Editar</Button>,
    copiar: () => <Button>Nova</Button>,
  },
];
const index = () => (
  <Container>
    <AddOfferContainer>
      <Button>Nova Oferta</Button>
    </AddOfferContainer>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cód</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Validade</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
              <TableCell>{item.id}</TableCell>

              <TableCell>{item.status}</TableCell>

              <TableCell>{item.validade}</TableCell>

              <TableCell>{item.status === 'Aberta' ? item.editar() : item.delete()}</TableCell>

              <TableCell>{item.status === 'Finalizada' && item.copiar()}</TableCell>
            </TableRow>
          ))}
          <TableRow />
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);

export default index;
