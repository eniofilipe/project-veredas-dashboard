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
  InputAdornment,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import { AddShoppingCart, ArrowBack, Save } from '@material-ui/icons';
import { Container, AddOrderContainer, WrapperButtons, WrapperValidade } from './styles';

import ModalProdutos from '../../__Modais/ListaProdutos';
import { Produto } from '../../../Types';
import { setOferta, setValidadeOferta } from '../../../Api/Ofertas';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

interface OfertaProd {
  produto: Produto;
  quantidade: number;
  valor: number;
}

const NovaOferta = () => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState('');
  const [produtos, setProdutos] = useState<OfertaProd[]>([]);
  const [openModalProduto, setOpenModalProduto] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const cadastraOferta = async () => {
    try {
      setLoading(true);
      const responseValidade = await setValidadeOferta({ validade: selectedDate });

      const idOferta = responseValidade.data.id;

      produtos.map(async (prod) => {
        await setOferta({
          produto_id: prod.produto.id,
          quantidade: prod.quantidade,
          validade_oferta_id: idOferta,
          valor_unitario: Number(prod.valor),
        });
      });

      history.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changeQuantidade = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], quantidade: value };

    setProdutos([...prodAux]);
  };

  const changeValor = (value: number, pos: number) => {
    const prodAux = produtos;

    prodAux[pos] = { ...produtos[pos], valor: value };

    setProdutos([...prodAux]);
  };

  return (
    <Container>
      <AddOrderContainer>
        <WrapperValidade>
          <span>Validade:</span>
          <TextField
            type="date"
            value={dayjs(selectedDate).format('YYYY-MM-DD')}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </WrapperValidade>

        <Button variant="contained" startIcon={<AddShoppingCart />} onClick={() => setOpenModalProduto(true)}>
          Adicionar Produto
        </Button>
      </AddOrderContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((item, pos) => (
              <TableRow hover tabIndex={-1} key={`cod${item.produto.id}`}>
                <TableCell>{item.produto.nome}</TableCell>
                <TableCell>{item.produto.descricao}</TableCell>
                <TableCell>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => changeQuantidade(Math.trunc(Number(e.target.value)), pos)}
                    inputProps={{
                      'aria-disabled': true,
                      min: 1,
                      step: 1,
                      pattern: /\d/,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    value={item.valor}
                    onChange={(e) => changeValor(Number(e.target.value), pos)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
      <WrapperButtons>
        <Button variant="contained" startIcon={<Save />} onClick={cadastraOferta}>
          Salvar
        </Button>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => history.goBack()}>
          Voltar
        </Button>
      </WrapperButtons>
      <ModalProdutos
        isOpen={openModalProduto}
        setModalClose={() => setOpenModalProduto(false)}
        selection={(prod) => {
          const prodOferta = {
            produto: prod,
            quantidade: 1,
            valor: 0,
          } as OfertaProd;

          setProdutos(produtos.concat(prodOferta));
        }}
      />
      <Backdrop open={loading} style={{ zIndex: 10 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Container>
  );
};

export default NovaOferta;
