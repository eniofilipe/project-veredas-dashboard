import React, { useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Container, AddOfferContainer } from '../ListaOfertas/styles';

const index = () => {
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const produtos = ['Alface', 'Cebola'];

  const rows = [
    {
      codigo: '463',
      nome: 'Alface',
      descricao: 'Pacote de 300g',
      categorias: 'Hortaliças',
      quantidade: 30,
      preco: 2,
      delete: () => <Button>Excluir</Button>,
    },
    {
      codigo: '430',
      nome: 'Cebola',
      descricao: '1 kg',
      categorias: 'Hortaliças',
      quantidade: 60,
      preco: 10,
      delete: () => <Button>Excluir</Button>,
    },
  ];
  return (
    <Container>
      <AddOfferContainer>
        Produto:
        {/* Adicionar select do produto */}
        <TextField id="outlined-basic" variant="outlined" />
        Quantidade:
        <TextField id="outlined-basic" variant="outlined" />
        Preço:
        <TextField id="outlined-basic" variant="outlined" />
        <Button>Adicionar Produto</Button>
      </AddOfferContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categorias</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.codigo}`}>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.categorias}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                </TableCell>
                <TableCell>{item.delete()}</TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
      <Button>Salvar</Button>
    </Container>
  );
};

export default index;
