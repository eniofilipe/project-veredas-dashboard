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
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AddShoppingCart, ArrowBack, DeleteOutline, PersonAdd, Save } from '@material-ui/icons';
import { Container, AddOrderContainer, WrapperCliente, WrapperButtons } from './styles';

import ModalClientes from '../../__Modais/ListaClientes';
import ModalProdutos from '../../__Modais/ListaOfertas';
import { Cliente, Oferta, OfertaPedido } from '../../../Types';
import { postPedido } from '../../../Api/Pedido';
import toasts from '../../../Utilities/toasts';

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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
      toasts.error('Erro ao cadastrar pedido, verifique os dados inseridos!');
    } finally {
      setLoading(false);
    }
  };

  const changeProduto = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], quantidade: value };

    setProdutos([...prodAux]);
  };

  const removeProd = (pos: number) => {
    const prodAux = [...produtos];

    prodAux.splice(pos, 1);

    setProdutos(prodAux);
  };

  const addProduto = (prod: Oferta) => {
    const isItem = produtos.find((value) => value.id === prod.id);

    if (!isItem) {
      setProdutos(produtos.concat({ ...prod, max_qtd: prod.quantidade, quantidade: 1 }));
    }
  };

  return (
    <Container>
      <AddOrderContainer>
        <WrapperCliente>
          <span>Cliente:</span>
          <TextField size="small" disabled id="outlined-basic" variant="outlined" value={cliente?.nome} />
          <Button variant="contained" startIcon={<PersonAdd />} onClick={() => setOpenModalCliente(true)}>
            Adicionar Cliente
          </Button>
        </WrapperCliente>

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

        <Button variant="contained" startIcon={<AddShoppingCart />} onClick={() => setOpenModalProduto(true)}>
          Adicionar Produto
        </Button>
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
                    onChange={(e) => changeProduto(Math.trunc(Number(e.target.value)), pos)}
                    inputProps={{
                      'aria-disabled': true,
                      min: 1,
                      step: 1,
                      max: item.max_qtd,
                      pattern: /\d/,
                    }}
                  />
                </TableCell>
                <TableCell>{item.produtos.nome}</TableCell>
                <TableCell>{item.produtos.descricao}</TableCell>
                <TableCell>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    item.quantidade * item.valor_unitario
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => removeProd(pos)} startIcon={<DeleteOutline />}>
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>

      <WrapperButtons>
        <Button variant="contained" startIcon={<Save />} onClick={cadastraPedido}>
          Salvar
        </Button>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => history.goBack()}>
          Voltar
        </Button>
      </WrapperButtons>

      <ModalClientes
        isOpen={openModalCliente}
        setModalClose={() => setOpenModalCliente(false)}
        selection={(cli) => setCliente(cli)}
      />
      <ModalProdutos
        isOpen={openModalProduto}
        setModalClose={() => setOpenModalProduto(false)}
        selection={addProduto}
      />
      <Backdrop open={loading} style={{ zIndex: 10 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default index;
