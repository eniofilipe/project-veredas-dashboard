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
  Checkbox,
} from '@material-ui/core';
import { AddCategoryContainer } from './styles';

import { getCategorias, postCategoria } from '../../Api/Categorias';

import { Categoria } from '../../Types';

const index = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nomeCategoria, setNomeCategoria] = useState<string>('');

  const cadastroCategoria = async () => {
    try {
      if (nomeCategoria !== '') {
        await postCategoria({
          nome: nomeCategoria,
        });

        listCategorias();
        setNomeCategoria('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listCategorias = async () => {
    try {
      const response = await getCategorias();

      setCategorias(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listCategorias();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <AddCategoryContainer>
        <span>Categoria: </span>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
        />
        <Button onClick={cadastroCategoria}>Adicionar</Button>
      </AddCategoryContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>
                <Button>Excluir</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>
                  <Button>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default index;
