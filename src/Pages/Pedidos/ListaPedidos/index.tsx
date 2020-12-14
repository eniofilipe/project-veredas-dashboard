import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
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
  Checkbox,
} from '@material-ui/core';

import { Container, SearchOrderContainer } from './styles';

import { Pedido } from '../../../Types';

import { getPedidos } from '../../../Api/Pedido';

const index = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const history = useHistory();

  const listPedidos = async () => {
    try {
      const response = await getPedidos();

      setPedidos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPedidos();
  }, []);

  return (
    <Container>
      <SearchOrderContainer>
        <Button onClick={() => history.push('/pedidos/novo')}>Novo Pedido</Button>
        <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
      </SearchOrderContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Código</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Data</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.clientes.nome}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell /> {/* Calcular Total */}
                <TableCell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <Button>Cancelar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default index;
