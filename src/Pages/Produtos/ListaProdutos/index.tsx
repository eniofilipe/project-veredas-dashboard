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
import { Produto } from '../../../Types';

import { getProduto, deleteProduto } from '../../../Api/Produtos';

const index = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const edit = (prod: Produto) => {
    history.push('/produtos/editar', prod);
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteProduto(id);

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
      const response = await getProduto();

      setProdutos(response.data.produtos);
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
        <Button variant="contained" onClick={() => history.push('/produtos/novo')} color="inherit" startIcon={<Add />}>
          Novo Produto
        </Button>
      </AddProductContainer>
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categorias</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((prod) => (
              <TableRow hover tabIndex={-1} key={`cod${prod.id}`}>
                <TableCell>{prod.id}</TableCell>
                <TableCell>{prod.nome}</TableCell>
                <TableCell>{prod.descricao}</TableCell>
                <TableCell>
                  {prod.categorias.map((category) => (
                    <Chip key={category.id} label={category.nome} />
                  ))}
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<Edit />} onClick={() => edit(prod)}>
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<DeleteOutline />} onClick={() => remove(prod.id)}>
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
