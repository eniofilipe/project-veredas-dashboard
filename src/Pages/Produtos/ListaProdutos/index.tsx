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
} from '@material-ui/core';
import { Container, AddProductContainer } from './styles';
import { Produto } from '../../../Types';

import { getProduto } from '../../../Api/Produtos';

const index = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const history = useHistory();

  const list = async () => {
    try {
      const response = await getProduto();

      setProdutos(response.data.produtos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <Container>
      <AddProductContainer>
        <Button onClick={() => history.push('/produtos/novo')}>Novo Produto</Button>
        <TextField id="outlined-basic" variant="outlined" placeholder="Buscar" />
      </AddProductContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cód</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categorias</TableCell>
              <TableCell>
                <Button>Excluir</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.length >= 1 &&
              produtos.map((prod) => (
                <TableRow hover tabIndex={-1} key={`cod${prod.id}`}>
                  <TableCell>{prod.id}</TableCell>

                  <TableCell>{prod.nome}</TableCell>

                  <TableCell>{prod.descricao}</TableCell>

                  <TableCell>{prod.categorias.map((category) => `${category.nome},`)}</TableCell>

                  <TableCell>
                    <Button>Excluir</Button>
                  </TableCell>
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
