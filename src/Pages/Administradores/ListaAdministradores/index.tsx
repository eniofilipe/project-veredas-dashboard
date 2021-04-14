import React, { useState, useEffect } from 'react';
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
  Chip,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Add, DeleteOutline, Edit } from '@material-ui/icons';
import { Container, AddProductContainer } from './styles';
import { Administrador } from '../../../Types';

import { getAdministradores, deleteAdministrador } from '../../../Api/Administradores';

const index = () => {
  const [administradores, setAdministradores] = useState<Administrador[]>([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const edit = (adm: Administrador) => {
    history.push('/administradores/editar', adm);
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteAdministrador(id);

      list();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const list = async () => {
    try {
      setLoading(true);
      const response = await getAdministradores();

      setAdministradores(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <Container>
      <AddProductContainer>
        <Button
          variant="contained"
          onClick={() => history.push('/administradores/novo')}
          color="inherit"
          startIcon={<Add />}
        >
          Novo Administrador
        </Button>
        <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
      </AddProductContainer>
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {administradores.map((adm) => (
              <TableRow hover tabIndex={-1} key={`cod${adm.id}`}>
                <TableCell>{adm.id}</TableCell>
                <TableCell>{adm.nome}</TableCell>
                <TableCell>{adm.email}</TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<Edit />} onClick={() => edit(adm)}>
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<DeleteOutline />} onClick={() => remove(adm.id)}>
                    Excluir
                  </Button>
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
