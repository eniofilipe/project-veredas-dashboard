/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import { Cliente, Oferta, OfertaPedido, Pedido, Produto, TipoPagamento } from '../../../Types';
import { getTiposPagamento, postPedido, putPedido } from '../../../Api/Pedido';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

interface IState {
  item: Pedido;
  visualizationMode?: boolean;
}

const index = () => {
  const location = useLocation<IState>();
  const history = useHistory();
  const classes = useStyles();
  const [pedido, setPedido] = useState(location.state.item);
  const [cliente, setCliente] = useState<Cliente>();
  const [produtos, setProdutos] = useState<Oferta[]>([]);
  const [openModalCliente, setOpenModalCliente] = useState(false);
  const [openModalProduto, setOpenModalProduto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<TipoPagamento>();
  const [open, setOpen] = useState(false);
  const [tiposPagamento, setTiposPagamento] = useState<TipoPagamento[]>([]);

  const handleChange = (event: any) => {
    setType(tiposPagamento[event.target.value]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const editPedido = async () => {
    try {
      setLoading(true);
      const ofertasAux = produtos.map((item) => {
        return {
          oferta_id: item.id,
          quantidade: item.quantidade,
        } as OfertaPedido;
      });

      console.log('chegou aqui');

      await putPedido(pedido.id, ofertasAux);

      history.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changeProduto = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], quantidade: value };

    setProdutos([...prodAux]);
  };

  const organizeData = async () => {
    if (pedido) {
      setCliente({
        ...pedido.clientes,
      });

      console.log(pedido);
      try {
        setLoading(true);
        const responsePagamentos = await getTiposPagamento();

        setTiposPagamento(responsePagamentos.data);

        const pagamento = responsePagamentos.data.findIndex((value) => value.id === pedido.tipo_pagamento_id);

        console.log(pagamento);

        if (pagamento >= 0) {
          setType(tiposPagamento[pagamento]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      const auxProdutos = pedido.ofertas.map((value) => {
        const produto: Produto = {
          categorias: [],
          descricao: value.produtos.descricao,
          id: value.produtos.id,
          imagem: { id: value.produtos.imagem_id, ...value.produtos.imagem },
          nome: value.produtos.nome,
        };

        return {
          id: value.id,
          produtos: produto,
          quantidade: value.oferta_pedidos.quantidade,
          valor_unitario: value.valor_unitario,
        } as Oferta;
      });

      setProdutos([...auxProdutos]);
    }
  };

  useEffect(() => {
    organizeData();
  }, [pedido]);

  const removeProd = (pos: number) => {
    const prodAux = [...produtos];

    prodAux.splice(pos, 1);

    setProdutos(prodAux);
  };

  return (
    <Container>
      <AddOrderContainer>
        <WrapperCliente>
          <span>Cliente:</span>
          <TextField size="small" disabled id="outlined-basic" variant="outlined" value={cliente?.nome} />
          <Button
            disabled={location.state.visualizationMode}
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setOpenModalCliente(true)}
          >
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
            disabled={location.state.visualizationMode}
          >
            {tiposPagamento.map((op, i) => (
              <MenuItem value={i} key={op.id}>
                {op.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          disabled={location.state.visualizationMode}
          variant="contained"
          startIcon={<AddShoppingCart />}
          onClick={() => setOpenModalProduto(true)}
        >
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
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((item, pos) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>
                  <TextField
                    disabled={location.state.visualizationMode}
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => changeProduto(Math.trunc(Number(e.target.value)), pos)}
                    inputProps={{
                      'aria-disabled': true,
                      min: 1,
                      step: 1,
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
                  <Button
                    disabled={location.state.visualizationMode}
                    variant="contained"
                    onClick={() => removeProd(pos)}
                    startIcon={<DeleteOutline />}
                  >
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
        <Button
          disabled={location.state.visualizationMode}
          variant="contained"
          startIcon={<Save />}
          onClick={editPedido}
        >
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
        selection={(prod) => setProdutos(produtos.concat({ ...prod, quantidade: 1 }))}
      />
      <Backdrop open={loading} style={{ zIndex: 10 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default index;
