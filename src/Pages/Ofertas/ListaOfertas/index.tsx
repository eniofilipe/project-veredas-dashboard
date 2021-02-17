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
  Checkbox,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { Add, DeleteOutline, Edit } from '@material-ui/icons';

import { Container, AddOfferContainer } from './styles';

import { Validade } from '../../../Types';

import { getOfertas } from '../../../Api/Ofertas';

const index = () => {
  const history = useHistory();
  const [ofertas, setOfertas] = useState<Validade[]>([]);
  const [loading, setLoading] = useState(false);

  const listOfertas = async () => {
    try {
      setLoading(true);
      const response = await getOfertas();

      setOfertas(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listOfertas();
  }, []);

  return (
    <Container>
      <AddOfferContainer>
        <Button variant="contained" startIcon={<Add />} onClick={() => history.push('/ofertas/novo')}>
          Nova Oferta
        </Button>
      </AddOfferContainer>
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Validade</TableCell>
              <TableCell />
              {/* <TableCell /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {ofertas.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.id}</TableCell>
                <TableCell align="center">{item.status}</TableCell>
                <TableCell align="center">{dayjs(item.validade).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center">
                  {item.status === 'ativa' ? (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => history.push(`/ofertas/id/${item.id}`)}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button variant="contained" startIcon={<DeleteOutline />}>
                      Remover
                    </Button>
                  )}
                </TableCell>
                {/* <TableCell>{item.status !== 'ativa' && <Button>Copiar</Button>}</TableCell> */}
              </TableRow>
            ))}
            <TableRow />
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
