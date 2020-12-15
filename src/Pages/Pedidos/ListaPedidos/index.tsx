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
} from '@material-ui/core';
import { Container, SearchOrderContainer } from './styles';
import { Pedido } from '../../../Types';
import { getPedidos } from '../../../Api/Pedido';
import { viewMoney } from '../../../Utilities/masks';

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
        <Button variant="contained" onClick={() => history.push('/pedidos/novo')}>
          Novo Pedido
        </Button>
        <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
      </SearchOrderContainer>
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Data</TableCell>
              {/* <TableCell /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                {/* <TableCell>
                  <Checkbox />
                </TableCell> */}
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.clientes.nome}</TableCell>
                <TableCell align="center">{item.status}</TableCell>
                <TableCell align="center">{viewMoney(item.total)}</TableCell>
                <TableCell align="center">{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                {/* <TableCell>
                  <Button>Cancelar</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default index;
