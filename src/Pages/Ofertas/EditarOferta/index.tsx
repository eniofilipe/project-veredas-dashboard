import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, TableContainer, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';

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
      <TableContainer>
        <TableHead>
          <TableCell>Código</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Categorias</TableCell>
          <TableCell>Quantidade</TableCell>
          <TableCell>Preço</TableCell>
        </TableHead>
        <TableBody />
      </TableContainer>
    </Container>
  );
};

export default index;
