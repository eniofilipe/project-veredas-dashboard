import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, TableHead, TableRow, TableCell, TableContainer, TableBody, Table, Paper } from '@material-ui/core';
import { Container, AddOfferContainer } from './styles';

import { Validade } from '../../../Types';

import { getOfertas } from '../../../Api/Ofertas';

const index = () => {
  const [ofertas, setOfertas] = useState<Validade[]>([]);

  const history = useHistory();

  const listOfertas = async () => {
    try {
      const response = await getOfertas();

      setOfertas(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    listOfertas();
  }, []);

  return (
    <Container>
      <AddOfferContainer>
        <Button onClick={() => history.push('/ofertas/nova')}>Nova Oferta</Button>
      </AddOfferContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Validade</TableCell>
              <TableCell />
              {/* <TableCell /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {ofertas.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{dayjs(item.validade).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  {item.status === 'ativa' ? (
                    <Button onClick={() => history.push(`/ofertas/id/${item.id}`)}>Editar</Button>
                  ) : (
                    <Button>Remover</Button>
                  )}
                </TableCell>
                {/* <TableCell>{item.status !== 'ativa' && <Button>Copiar</Button>}</TableCell> */}
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
