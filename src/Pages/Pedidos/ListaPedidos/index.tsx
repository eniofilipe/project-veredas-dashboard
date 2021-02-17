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
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { Add, Close } from '@material-ui/icons';
import { Container, SearchOrderContainer } from './styles';

import { Pedido } from '../../../Types';

import { getPedidos } from '../../../Api/Pedido';

const index = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const listPedidos = async () => {
    try {
      setLoading(true);
      const response = await getPedidos();

      setPedidos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listPedidos();
  }, []);

  return (
    <Container>
      <SearchOrderContainer>
        <Button startIcon={<Add />} variant="contained" onClick={() => history.push('/pedidos/novo')}>
          Novo Pedido
        </Button>
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
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.clientes.nome}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell /> {/* Calcular Total */}
                <TableCell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <Button startIcon={<Close />} variant="contained">
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Backdrop open={loading} style={{ zIndex: 10 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      </TableContainer>
    </Container>
  );
};

export default index;
