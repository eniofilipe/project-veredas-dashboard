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
        <Button variant="contained" onClick={() => history.push('/produtos/novo')}>
          Novo Produto
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
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Categorias</TableCell>
              {/* <TableCell /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((prod) => (
              <TableRow hover tabIndex={-1} key={`cod${prod.id}`}>
                <TableCell>{prod.id}</TableCell>
                <TableCell>{prod.nome}</TableCell>
                <TableCell align="center">{prod.descricao}</TableCell>
                <TableCell align="center">{prod.categorias.map((category) => `${category.nome},`)}</TableCell>
                {/* <TableCell>
                  <Button>Excluir</Button>
                </TableCell> */}
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
