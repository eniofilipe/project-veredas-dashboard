import React, { useState, useEffect } from 'react';
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
import { Container, SearchUsersContainer } from './styles';

import { Usuario } from '../../../Types';

import { getUsuarios } from '../../../Api/Usuario';

const index = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const listUsuarios = async () => {
    try {
      const response = await getUsuarios();

      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listUsuarios();
  }, []);

  return (
    <Container>
      <SearchUsersContainer>
        <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
      </SearchUsersContainer>
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
                <TableCell>{item.endereco}</TableCell>
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
