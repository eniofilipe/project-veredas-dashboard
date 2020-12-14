/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  TextField,
  Button,
  Paper,
} from '@material-ui/core';
import { Container, AddProductContainer } from './styles';
import { viewMoney } from '../../../Utilities/masks';

import { Oferta } from '../../../Types';

import { getProdutosOfertas } from '../../../Api/Ofertas';

const index = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);

  const listProdutos = async () => {
    try {
      const response = await getProdutosOfertas();

      setOfertas(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const changeOferta = (value: number, pos: number) => {
    const prodAux = ofertas;

    prodAux[pos] = { ...ofertas[pos], quantidade: value };

    setOfertas([...prodAux]);
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categorias</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor Unitário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ofertas.map((item, pos) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.produtos.id}</TableCell>
                <TableCell>{item.produtos.nome}</TableCell>
                <TableCell>{item.produtos.descricao}</TableCell>
                <TableCell>{item.produtos.categorias.map((category) => `${category.nome}, `)}</TableCell>
                <TableCell>
                  <TextField 
                    id="standard-number" 
                    type="number" 
                    value={item.quantidade} 
                    onChange={(e) => changeOferta(Number(e.target.value), pos)}
                  />
                </TableCell>
                <TableCell>{viewMoney(item.valor_unitario)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button>Salvar</Button>
    </Container>
  );
};

export default index;
