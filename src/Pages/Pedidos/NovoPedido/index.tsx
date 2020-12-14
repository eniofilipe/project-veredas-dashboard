/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container, AddOrderContainer } from './styles';
import ModalClientes from '../../__Modais/ListaClientes';
import ModalProdutos from '../../__Modais/ListaOfertas';
import { Cliente, Oferta, OfertaPedido } from '../../../Types';
import { postPedido } from '../../../Api/Pedido';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

const index = () => {
  const history = useHistory();
  const classes = useStyles();
  const [cliente, setCliente] = useState<Cliente>();
  const [produtos, setProdutos] = useState<Oferta[]>([]);
  const [openModalCliente, setOpenModalCliente] = useState(false);
  const [openModalProduto, setOpenModalProduto] = useState(false);

  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);
  const options = ['Dinheiro', 'Cartão de Débito'];

  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const cadastraPedido = async () => {
    try {
      const ofertasAux = produtos.map((item) => {
        return {
          oferta_id: item.id,
          quantidade: item.quantidade,
        } as OfertaPedido;
      });

      if (cliente) {
        await postPedido({
          cliente_id: cliente.id,
          tipo_pagamento_id: 1,
          valor_frete: 5,
          ofertas: ofertasAux,
          tipo_frete_id: 1,
        });

        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeProduto = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], quantidade: value };

    setProdutos([...prodAux]);
  };

  return (
    <Container>
      <AddOrderContainer>
        <span>Cliente:</span>
        <TextField disabled id="outlined-basic" variant="outlined" value={cliente?.nome} />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Tipo de Pagamento</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={type}
            onChange={handleChange}
          >
            {options &&
              options.map((op, i) => (
                <MenuItem value={op} key={op}>
                  {op}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button onClick={() => setOpenModalCliente(true)}>Adicionar Cliente</Button>
        <Button onClick={() => setOpenModalProduto(true)}>Adicionar Produto</Button>
      </AddOrderContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quantidade</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((item, pos) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => changeProduto(Number(e.target.value), pos)}
                  />
                </TableCell>
                <TableCell>{item.produtos.nome}</TableCell>
                <TableCell>{item.produtos.descricao}</TableCell>
                <TableCell>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    item.quantidade * item.valor_unitario
                  )}
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => history.goBack()}>Voltar</Button>
      <Button onClick={cadastraPedido}>Salvar</Button>
      <ModalClientes
        isOpen={openModalCliente}
        setModalClose={() => setOpenModalCliente(false)}
        selection={(cli) => setCliente(cli)}
      />
      <ModalProdutos
        isOpen={openModalProduto}
        setModalClose={() => setOpenModalProduto(false)}
        selection={(prod) => setProdutos(produtos.concat({ ...prod, quantidade: 1 }))}
      />
    </Container>
  );
};

export default index;
