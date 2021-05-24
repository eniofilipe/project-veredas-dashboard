import React, { useState, useEffect } from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Table,
  Paper,
  TextField,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Container, SearchUsersContainer } from './styles';

import { Usuario } from '../../../Types';

import { getUsuarios } from '../../../Api/Usuario';

const index = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const listUsuarios = async () => {
    try {
      setLoading(true);
      const response = await getUsuarios();

      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listUsuarios();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Endereço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.telefone}</TableCell>
                <TableCell>
                  {item.enderecos.logradouro}, {item.enderecos.numero}, {item.enderecos.bairro}
                </TableCell>
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
