import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  TextField,
  Button,
} from '@material-ui/core';
import { AddProductContainer } from './styles';

import { Oferta } from '../../../Types';
import { getProdutosOfertas } from '../../../Api/Ofertas';

const index = () => {
  const [oferta, setOferta] = useState<Oferta[]>([]);

  const history = useHistory();

  const listProdutos = async () => {
    try {
      const response = await getProdutosOfertas();

      setOferta(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    listProdutos();
  }, []);

  return (
    <Container>
      <AddProductContainer>
        Produto:
        {/* Adicionar select do produto */}
        <TextField id="outlined-basic" variant="outlined" />
        Quantidade:
        <TextField id="outlined-basic" variant="outlined" />
        Preço:
        <TextField id="outlined-basic" variant="outlined" />
        <Button>Adicionar Produto</Button>
      </AddProductContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categorias</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody />
        </Table>
      </TableContainer>
    </Container>
  );
};

export default index;
