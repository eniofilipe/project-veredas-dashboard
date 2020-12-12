import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

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

import { Validade } from '../../../Types';

import { getOfertas } from '../../../Api/Ofertas';

const index = () => {
  const history = useHistory();
  const [ofertas, setOfertas] = useState<Validade[]>([]);

  const listOfertas = async () => {
    try {
      const response = await getOfertas();

      setOfertas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listOfertas();
  }, []);

  return (
    <Container>
      <AddOfferContainer>
        <Button onClick={() => history.push('/ofertas/novo')}>Nova Oferta</Button>
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
            {ofertas.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.id}</TableCell>

                <TableCell>{item.status}</TableCell>

                <TableCell>{dayjs(item.validade).format('DD/MM/YYYY')}</TableCell>

                <TableCell>{item.status === 'ativa' ? <Button>Editar</Button> : <Button>Remover</Button>}</TableCell>

                <TableCell>{item.status !== 'ativa' && <Button>Copiar</Button>}</TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default index;
