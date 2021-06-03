import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  Backdrop,
  CircularProgress,
  Input,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import { AddShoppingCart, ArrowBack, DeleteOutline, Save } from '@material-ui/icons';
import { Container, AddOrderContainer, WrapperButtons, WrapperValidade } from './styles';

import ModalProdutos from '../../__Modais/ListaProdutos';
import { Produto } from '../../../Types';
import { getOfertasOfValidade, getProdutosOfertas, setOferta, setValidadeOferta } from '../../../Api/Ofertas';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

interface IState {
  id?: number;
}

interface OfertaProd {
  produto: Produto;
  quantidade: number;
  valor: number;
}

const NovaOferta = () => {
  const history = useHistory();
  const location = useLocation<IState | undefined>();
  const [selectedDate, setSelectedDate] = useState('');
  const [idOfertaAntiga, setIdOfertaAntiga] = useState(location.state?.id);
  const [produtos, setProdutos] = useState<OfertaProd[]>([]);
  const [openModalProduto, setOpenModalProduto] = useState(false);
  const [loading, setLoading] = useState(false);

  const carregaOfertaAntiga = async () => {
    if (idOfertaAntiga) {
      try {
        setLoading(true);

        const response = await getOfertasOfValidade(idOfertaAntiga);

        const arrayAux = response.data.map((value) => {
          return {
            produto: value.produtos,
            quantidade: value.quantidade,
            valor: value.valor_unitario,
          } as OfertaProd;
        });

        setProdutos(arrayAux);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    carregaOfertaAntiga();
  }, [idOfertaAntiga]);

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

  const removeOferta = (pos: number) => {
    const prodAux = [...produtos];

    prodAux.splice(pos, 1);

    setProdutos(prodAux);
  };

  const minDate = dayjs(new Date()).add(1, 'day').format('YYYY-MM-DD');

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
            inputProps={{
              min: minDate,
            }}
          />
        </WrapperValidade>

        <Button variant="contained" startIcon={<AddShoppingCart />} onClick={() => setOpenModalProduto(true)}>
          Adicionar Produto
        </Button>
      </AddOrderContainer>
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((item, pos) => (
              <TableRow hover tabIndex={-1} key={`cod${item.produto.id}`}>
                <TableCell>{item.produto.nome}</TableCell>
                <TableCell align="center">{item.produto.descricao}</TableCell>
                <TableCell align="center">
                  <Input
                    id="standard-number"
                    type="number"
                    style={{ width: 60 }}
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
                <TableCell align="center">
                  <Input
                    id="standard-start-adornment"
                    type="number"
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                    value={item.valor}
                    style={{ width: 100 }}
                    onChange={(e) => changeValor(Number(e.target.value), pos)}
                    inputProps={{
                      min: 0,
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => removeOferta(pos)} startIcon={<DeleteOutline />}>
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
