/* eslint-disable react/display-name */
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
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { DeleteOutline, Add, Edit } from '@material-ui/icons';
import { AddCategoryContainer, InputCategoria } from './styles';

import { getCategorias, postCategoria, deleteCategoria, putCategoria } from '../../Api/Categorias';

import { Categoria } from '../../Types';

const index = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nomeCategoria, setNomeCategoria] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const remove = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteCategoria(id);

      listCategorias();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const cadastroCategoria = async () => {
    try {
      setLoading(true);
      if (nomeCategoria !== '') {
        await postCategoria({
          nome: nomeCategoria,
        });

        listCategorias();
        setNomeCategoria('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const listCategorias = async () => {
    try {
      setLoading(true);
      const response = await getCategorias();

      setCategorias(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listCategorias();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <AddCategoryContainer>
        <span>Categoria: </span>
        <InputCategoria
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
        />
        <Button variant="contained" startIcon={<Add />} onClick={cadastroCategoria}>
          Adicionar
        </Button>
      </AddCategoryContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<Edit />} onClick={() => history.push('/categoria', { item })}>
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<DeleteOutline />} onClick={() => remove(item.id)}>
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
    </div>
  );
};

export default index;
