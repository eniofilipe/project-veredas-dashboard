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
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

import { Add, Close, Edit } from '@material-ui/icons';
import { Container, SearchOrderContainer } from './styles';
import { Pedido } from '../../../Types';
import { getPedidos, cancelPedido } from '../../../Api/Pedido';
import { viewMoney } from '../../../Utilities/masks';
import toasts from '../../../Utilities/toasts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    busca: {
      width: '50ch',
    },
  })
);

const index = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

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

  const cancel = async (id: number) => {
    try {
      setLoading(true);
      await cancelPedido(id);

      await listPedidos();
    } catch (error) {
      toasts.error('Erro ao cancelar pedido');
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
      </SearchOrderContainer>
      <p />
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
                <TableCell>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    item.ofertas
                      .map((value) => value.valor_unitario * value.oferta_pedidos.quantidade)
                      .reduce((prev, next) => prev + next, 0)
                  )}
                </TableCell>{' '}
                {/* Calcular Total */}
                <TableCell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<Edit />}
                    variant="contained"
                    onClick={() => history.push('/pedidos/editar', { item })}
                  >
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button startIcon={<Close />} variant="contained" onClick={() => cancel(item.id)}>
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
